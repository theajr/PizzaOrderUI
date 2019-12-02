## Pizza Order App

### What's done so far

- [x] Login
- [x] Signup
- [x] Profile View
- [x] Available Pizzas menu display
- [x] Add addresses
- [x] Delete address
- [x] Cart functionality
- [x] Place Order
- [x] Order history view
- [x] Signout

### What could be done more(If had enough time :-P)

- [ ] Profile update Functionality
- [ ] Address update Functionality
- [ ] Progressive pagination to load pizzas menu and orders using `IntersectionObserver` or `natural (prev, next)` pagination

### Command to run locally

```sh
git clone https://github.com/theajr/PizzaOrderUI.git
cd PizzaOrderUI
npm install
npm run dev # You are up at http://localhost:8080
```

### How did deploy to heroku

```sh
heroku login # To loginto heroku using cli
heroku create pizzaboy-theajr
echo 'web:node express.js' > Procfile # to start serving website using express.js
touch static.json # and added content to reroute all paths to index.html so that reach routes will be honored
git add .
git commit -m "about to deploy"
git push heroku master # Viola, site is up!
```
