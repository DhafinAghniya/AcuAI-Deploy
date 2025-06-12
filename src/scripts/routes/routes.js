import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import FeaturePage from "../pages/feature/feature-page";
import ProductPage from "../pages/product/product-page";
import CommunityPage from "../pages/component/community-page";
import ForumPage from "../pages/component/forum-page";
import FeedbackPage from "../pages/component/feedback-page";
import UploadPage from "../pages/feature/upload-page";
import ResultPage from "../pages/feature/result-page";
import LoginPage from "../pages/login/login-page";
import RegisterPage from "../pages/login/register-page";


const routes = {
  "/": new LoginPage(),
  "/register": new RegisterPage(),
  "/home": new HomePage(),
  "/about": new AboutPage(),
  "/feature": new FeaturePage(),
  "/product": new ProductPage(),
  "/community": new CommunityPage(),
  "/forum": new ForumPage(),
  "/feedback": new FeedbackPage(),
  "/upload": new UploadPage(),
  "/result": new ResultPage(),
};

export default routes;
