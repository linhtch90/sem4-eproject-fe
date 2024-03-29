import { configureStore } from '@reduxjs/toolkit';

import adminCategoryReducer from '../feature/admin_category/AdminCategorySlice';
import adminContactReducer from '../feature/admin_contact/AdminContactSlice';
import adminCustomerReviewReducer from '../feature/admin_customerreview/AdminCustomerReviewSlice';
import adminDomainReducer from '../feature/admin_domain/AdminDomainSlice';
import adminFaqReducer from '../feature/admin_faq/AdminFaqSlice';
import adminFeedbackReducer from '../feature/admin_feedback/AdminFeedbackSlice';
import adminNewsReducer from '../feature/admin_news/AdminNewsSlice';
import adminProductReducer from '../feature/admin_product/AdminProductSlice';
import adminProjectReducer from '../feature/admin_project/AdminProjectSlice';
import adminServiceReducer from '../feature/admin_service/AdminServiceSlice';
import adminUserReducer from '../feature/admin_user/AdminUserSlice';
import adminAboutUsReducer from '../feature/AdminAboutUs/AdminAboutUsSlice';
import cartReducer from '../feature/cart/CartSlice';
import categoryReducer from '../feature/category/CategorySlice';
import customerReviewReducer from '../feature/customerreview/CustomerReviewSlice';
import domainReducer from '../feature/domain/DomainSlice';
import faqReducer from '../feature/faq/FaqSlice';
import feedbackReducer from '../feature/feedback/FeedbackSlice';
import invoiceReducer from '../feature/invoice/InvoiceSlice';
import invoiceitemReducer from '../feature/invoiceitem/InvoiceitemSlice';
import newsReducer from '../feature/news/NewsSlice';
import productReducer from '../feature/product/ProductSlice';
import serviceReducer from '../feature/service/ServiceSlice';
import userReducer from '../feature/user/UserSlice';

export const store = configureStore({
  reducer: {
    faqReducer,
    userReducer,
    adminProjectReducer,
    adminProductReducer,
    adminUserReducer,
    adminFaqReducer,
    adminFeedbackReducer,
    domainReducer,
    categoryReducer,
    serviceReducer,
    productReducer,
    cartReducer,
    invoiceReducer,
    invoiceitemReducer,
    customerReviewReducer,
    adminCustomerReviewReducer,
    adminContactReducer,
    adminAboutUsReducer,
    adminDomainReducer,
    adminServiceReducer,
    adminNewsReducer,
    newsReducer,
    feedbackReducer,
    adminCategoryReducer,
  },
});
