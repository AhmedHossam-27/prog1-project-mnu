from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'ahmed_hossam_2026' 

hotels = {
    "1": {
        "name": "Kyoto Ryokan Pavilion", "price": 420, "location": "Kyoto, Japan",
        "desc": "Traditional Japanese living with zen gardens and private onsen.",
        "img": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1621266330225-780c85c00e12?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80"
        ],
        "rooms": [{"type": "Zen Tatami", "status": "Available", "price": 420}, {"type": "Imperial Suite", "status": "1 Left", "price": 850}]
    },
    "2": {
        "name": "Amalfi Cliffside Resort", "price": 680, "location": "Positano, Italy",
        "desc": "Luxury villas with infinity pools overlooking the Mediterranean.",
        "img": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1512918766775-d2632368c39d?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&w=600&q=80"
        ],
        "rooms": [{"type": "Sea View Classic", "status": "Available", "price": 680}, {"type": "Presidential", "status": "Available", "price": 1500}]
    },
    "3": {
        "name": "Burj Al Arab", "price": 1400, "location": "Dubai, UAE",
        "desc": "World's only 7-star luxury experience with gold interiors.",
        "img": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?auto=format&fit=crop&w=600&q=80"
        ],
        "rooms": [{"type": "Deluxe Marina", "status": "Available", "price": 1400}, {"type": "Royal Gold", "status": "Sold Out", "price": 5000}]
    },
    "4": {
        "name": "Maldives Water Villa", "price": 950, "location": "Male, Maldives",
        "desc": "Overwater sanctuary with direct access to the ocean.",
        "img": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1573843225244-5347971a0182?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1505881502353-a1986add3732?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80"
        ],
        "rooms": [{"type": "Ocean Sunrise", "status": "Available", "price": 950}, {"type": "Sunset Villa", "status": "2 Left", "price": 1200}]
    },
    "5": {
        "name": "Swiss Alps Lodge", "price": 520, "location": "Zermatt, Switzerland",
        "desc": "Cozy chalets with breathtaking views of the Matterhorn.",
        "img": "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1445077100181-a33e9ac94db0?auto=format&fit=crop&w=600&q=80"
        ],
        "rooms": [{"type": "Ski Lodge Studio", "status": "Available", "price": 520}, {"type": "Matterhorn Peak", "status": "Available", "price": 900}]
    },
    "6": {
        "name": "Santorini White Blue", "price": 450, "location": "Oia, Greece",
        "desc": "Iconic white buildings overlooking the Aegean Sea.",
        "img": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1516483642144-738622288632?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1431274172761-fca41d93e114?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1469022563428-aa04fef9f5a2?auto=format&fit=crop&w=600&q=80"
        ],
        "rooms": [{"type": "Standard Cave", "status": "Available", "price": 450}, {"type": "Infinity Pool", "status": "Sold Out", "price": 850}]
    },
    "7": {
        "name": "Finnish Glass Igloo", "price": 600, "location": "Lapland, Finland",
        "desc": "Sleep under the Northern Lights in a heated glass dome.",
        "img": "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=800&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1520190282179-6e16ad39342a?auto=format&fit=crop&w=600&q=80"
        ],
        "rooms": [{"type": "Aurora Dome", "status": "Available", "price": 600}, {"type": "Premium Igloo", "status": "Available", "price": 950}]
    },
    "8": {
        "name": "Parisian Palace", "price": 750, "location": "Paris, France",
        "desc": "Elegant French luxury with views of the Eiffel Tower.",
        "img": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1551882547-ff43c619c724?auto=format&fit=crop&w=600&q=80"
        ],
        "rooms": [{"type": "Luxury Single", "status": "Available", "price": 750}, {"type": "Eiffel Panorama", "status": "Available", "price": 1300}]
    }
}



@app.route('/')
def index():
    return render_template('index.html', hotels=hotels)



@app.route('/hotel/<id>')
def hotel_details(id):
    hotel = hotels.get(id)
    return render_template('details.html', hotel=hotel)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['user'] = request.form.get('username')
        return redirect(url_for('index'))
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))

@app.route('/payment/<name>/<price>')
def payment(name, price):
    return render_template('payment.html', name=name, price=price)

@app.route('/admin')
def admin():
    return render_template('admin.html')

if __name__ == '__main__':
    app.run(debug=True)
