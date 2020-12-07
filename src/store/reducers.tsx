import { combineReducers } from 'redux';
import app from './app/app.reducer';
import art from './art/art.reducer';
import shop from './shop/shop.reducer';
import campaigns from './campaign/campaign.reducer'
import dashboard from './dashboard/dashboard.reducer';
const reducer = combineReducers({
    app, art, shop, dashboard, campaigns
});

export default reducer;
