from django.shortcuts import render, redirect


# Create your views here.
def dashboard(request):
    return render(request, "dashboard.html")


def login(request):
    # return render(request, "login.html")
    if request.method == "POST":
        username = request.POST.get('email', None)
        password = request.POST.get('password', None)
        print(username, password,)

        return render(request, 'dashboard.html')

    # login_form = form.UserForm()
    return render(request, 'login.html')