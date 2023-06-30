from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import DreamSerializer
from .models import Dream, User
from rest_framework.authtoken.models import Token
from django.db import IntegrityError
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from django.core.paginator import Paginator, EmptyPage
from django.db.models import Q, Avg, Count
from django.db.models.functions import Length
from django.utils import timezone
import calendar

# Create your views here.
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'login': '/task-list/',
        'register': '/register/',
        'list all dreams': '/dream-list-all/',
        'list dreams to one user': '/dream-list/ - Requires token',
        'create dream': '/dream-create/ - Requires token',
        'update dream': '/dream-update/<str:id>/',
        'delete dream': '/dream-delete/<str:id>/',
        'view dream stats': '/dream-stats/',
        'register': '/register/',
        'login': '/login/',
        'logout': '/logout/',
    }
    return Response(api_urls)

@api_view(['GET'])
def dreamListAll(request):
    dreams = Dream.objects.all()
    serializer = DreamSerializer(dreams, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def dreamList(request):
    user = Token.objects.get(key=request.data.get('token')).user
    page_num = request.data.get('pageNum')
    entry_per_page = request.data.get('entryPerPage')

    dreams = Dream.objects.filter(user=user).order_by('-date', '-rating')
    displayAllResults = request.data.get('displayAllResults')
    
    if not displayAllResults:
        dreams = advancedFilterEntries(request, dreams)

    page_num = request.data.get('pageNum')
    entry_per_page = request.data.get('entryPerPage')

    try:
        desired_page_entries, total_pages = getPaginationInfo(dreams, page_num, entry_per_page)
    except EmptyPage:
        Response({"message": "Page out of range."}, status=400)

    serializer = DreamSerializer(desired_page_entries, many=True)
    return Response({
        "entries": serializer.data,
        "totalPages": total_pages,
        "pageNum": page_num
    }, status=200)

def advancedFilterEntries(request, dreams):
    search_params = request.data.get('searchParams')
    complex_filter = Q()
        
    keywords = search_params.get('keywords')
    if keywords is not None:
        complex_filter = complex_filter & (Q(title__contains=keywords) | Q(desc__contains=keywords))

    # Filter date. Entries must fall between start AND end.
    date_filter = Q()
    start_date = search_params.get('startDate')
    if start_date is not None:
        date_filter = date_filter & Q(date__gte=start_date)

    end_date = search_params.get('endDate')
    if end_date is not None:
        date_filter = date_filter & Q(date__lte=end_date)

    # Filter the star ratings. Ratings is a OR filter.
    star_filter = Q()
    one_star = search_params.get('oneStar')
    if one_star is not None:
        star_filter = star_filter | (Q(rating=1))

    two_star = search_params.get('twoStar')
    if two_star is not None:
        star_filter = star_filter | (Q(rating=2))

    three_star = search_params.get('threeStar')
    if three_star is not None:
        star_filter = star_filter | (Q(rating=3))

    four_star = search_params.get('fourStar')
    if four_star is not None:
        star_filter = star_filter | (Q(rating=4))

    five_star = search_params.get('fiveStar')
    if five_star is not None:
        star_filter = star_filter | (Q(rating=5))

    dreams = dreams.filter(complex_filter & star_filter & date_filter)

    return dreams

def getPaginationInfo(entries, page_num, entry_per_page):
    p = Paginator(entries, entry_per_page)
    
    desired_page_entries = p.page(page_num)
    total_pages = p.num_pages

    return [desired_page_entries, total_pages]

@api_view(['POST'])
def dreamCreate(request):
    all_fields_valid, error_response = allValidDreamFields(request)
    if not all_fields_valid:
        return error_response

    modified_data = request.data.copy()
    user = Token.objects.get(key=request.data.get('token')).user
    modified_data['user'] = user.id

    serializer = DreamSerializer(data=modified_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)
    
    return Response(serializer.data, status=400)


@api_view(['POST'])
def dreamUpdate(request):
    all_fields_valid, error_response = allValidDreamFields(request)
    if not all_fields_valid:
        return error_response

    dream = Dream.objects.get(pk=request.data.get('id'))
    serializer = DreamSerializer(instance=dream, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)

    return Response(serializer.data, status=400)

@api_view(['POST'])
def dreamDelete(request):
    dream = Dream.objects.get(pk=request.data.get('id'))
    dream.delete()

    return Response("Item deleted!", status=200)

def allValidDreamFields(request):
    title = request.data.get('title')
    date = request.data.get('date')
    desc = request.data.get('desc')
    rating = request.data.get('rating')

    if title.strip() == "" or date == "" or desc.strip() == "" or rating == "":
        return [False, Response({"message": "Please fill in all fields."}, status=400)]
    
    title_max_length = Dream._meta.get_field('title').max_length
    if len(title) > title_max_length:
        return [False, 
                Response({"message": f"Your title is too long! It should be at most {title_max_length} characters (Current: {len(title)})."}, status=400)]
    
    # Then finally validate date
    return validateDate(date)

def validateDate(date):
    if date == "":
        return [False, Response({"message": "Please fill in all fields."}, status=400)]

    compared_date = datetime.strptime(date, '%Y-%m-%d')
    # +1 day allowance for timezones
    current_date = datetime.now().date() + timedelta(days=1)
    date_equal_or_before_now = compared_date.date() <= current_date
    if not date_equal_or_before_now:
        return [False, Response({"message": "Please enter a valid date."}, status=400)]
    
    return [True, "This field is unused"]

@api_view(['POST'])
def register_view(request):
    username = request.data.get('username')
    email = request.data.get('email')

    # Ensure password matches confirmation
    password = request.data.get("password")
    confirmation = request.data.get("confirmation")

    if username == "" or email == "" or password == "" or confirmation == "":
        return Response({"message": "Please fill in all fields."}, status=400)
    
    if password != confirmation:
        return Response({"message": "Passwords must match."}, status=400)

    # Attempt to create new user
    try:
        user = User.objects.create_user(username, email, password)
        user.save()
    except IntegrityError:
        return Response({"message": "Username already exists"}, status=400)
    
    token, create = Token.objects.get_or_create(user=user)
    return Response({
        "user": username,
        "token": token.key
        }, status=200)

@api_view(['POST'])
def login_view(request):
    # Attempt to sign user in
    username = request.data.get('username')
    password = request.data.get('password')

    if username == "" or password == "":
        return Response({"message": "Please fill in all fields."}, status=400)

    user = authenticate(request, username=username, password=password)

   # Check if authentication successful
    if user is not None:
        token, create = Token.objects.get_or_create(user=user)
        login(request, user)
        return Response({
            "user": username,
            "token": token.key,
            "maxEntriesPerPage": user.max_entries_per_page_setting,
        }, status=200)
    
    return Response({"message": "Wrong username or password."}, status=400)

@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({"message": "Logged Out"}, status=200)

@api_view(['POST'])
def update_user_settings(request):
    user = Token.objects.get(key=request.data.get('token')).user
    max_entries_per_page_setting = request.data.get('maxEntriesPerPage')

    user.max_entries_per_page_setting = int(max_entries_per_page_setting)
    user.save()
    return Response({"message": f"Max entries set to {user.max_entries_per_page_setting}"}, status=200)

@api_view(['POST'])
def dreamStats(request):
    user = Token.objects.get(key=request.data.get('token')).user
    interval = request.data.get('interval')

    today_date = timezone.now().date()
    # Note: months arg is (interval - 1) to account for the current month
    cut_off_date = (today_date - relativedelta(months=interval-1)).replace(day=1)
    earliest_dream = Dream.objects.filter(user=user).order_by('date').first()
    earliest_dream_date = earliest_dream.date if earliest_dream is not None else cut_off_date

    if (cut_off_date < earliest_dream_date):
        cut_off_date = earliest_dream_date
    # Attempt to account for timezones
    days_between = max(1, (today_date - cut_off_date).days + 1)

    months = []
    for i in range(interval):
        curr_date = cut_off_date + relativedelta(months=i)
        month_name = calendar.month_name[curr_date.month]
        months.append(month_name)

    all_dreams = Dream.objects.filter(user=user)
    recent_dreams = all_dreams.filter(date__gte=cut_off_date)
    has_at_least_one_dream = all_dreams.count() > 0

    dream_count_dist, rating_ave_dist, has_dreams_dist = \
        getMonthlyStats(cut_off_date, interval, recent_dreams)
    
    dream_count_total_recent = recent_dreams.count()
    dream_count_ave_recent = dream_count_total_recent / days_between

    rating_ave_recent = recent_dreams.aggregate(Avg("rating"))['rating__avg']
    rating_ave_lifetime = all_dreams.aggregate(Avg("rating"))['rating__avg']

    has_dreams_count_recent = recent_dreams.values('date').distinct().count()

    rating_spread_recent = calculateRatingSpread(recent_dreams)
    rating_spread_lifetime = calculateRatingSpread(all_dreams)

    most_dreams_day = \
        all_dreams.values('date').annotate(dreamsOnDay=Count('*')) \
        .order_by('-dreamsOnDay').first()
    
    longest_dream = all_dreams.order_by(-Length('desc'),'-rating').first()
    seralized_longest_dream = DreamSerializer(longest_dream).data
    longest_dream_length = len(longest_dream.desc) if longest_dream is not None else 0

    return Response({
        "cutOffDate": cut_off_date,
        "interval": interval,
        "hasAtLeastOneDream": has_at_least_one_dream,

        "months": months,
        "dreamCountTotalRecent": dream_count_total_recent,
        "dreamCountDist": dream_count_dist,
        "dreamCountAveRecent": dream_count_ave_recent,

        "ratingAveDist": rating_ave_dist,
        "ratingAveRecent": rating_ave_recent,
        "ratingAveLifetime": rating_ave_lifetime,

        "hasDreamsDist": has_dreams_dist,
        "hasDreamCountRecent": has_dreams_count_recent,
        "totalDaysRecent": days_between,
        "hasDreamPercentageRecent": has_dreams_count_recent / days_between,

        "ratingSpreadRecent": rating_spread_recent,
        "ratingSpreadLifetime": rating_spread_lifetime,

        "dreamCountTotal": all_dreams.count(),
        "mostDreamsDay": most_dreams_day,
        "longestDream": seralized_longest_dream,
        "longestDreamLength" : longest_dream_length
    }, status=200)

def getMonthlyStats(cut_off_date, interval, recent_dreams):
    dream_count_dist = []
    rating_ave_dist = []
    has_dreams_dist = []

    for i in range(interval):
        start = cut_off_date + relativedelta(months=i)
        end = cut_off_date + relativedelta(months=(i + 1))

        # its less than for end
        date_filter = Q(date__gte=start) & Q(date__lt=end)
        dreams_in_month = recent_dreams.filter(date_filter)

        dream_count_dist.append(dreams_in_month.count())
        
        rating_in_month = dreams_in_month.aggregate(Avg("rating"))['rating__avg']
        rating_ave_dist.append(rating_in_month if rating_in_month is not None else 0)
        has_dreams_dist.append(dreams_in_month.values('date').distinct().count())

    return dream_count_dist, rating_ave_dist, has_dreams_dist

def calculateRatingSpread(dreams):
    return [
        dreams.filter(rating=1).count(),
        dreams.filter(rating=2).count(),
        dreams.filter(rating=3).count(),
        dreams.filter(rating=4).count(),
        dreams.filter(rating=5).count()
    ]