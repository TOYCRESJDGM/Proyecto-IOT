import "./MenuView.css";
import AppFooter from "../AppFooter";
import AppHeader from "../AppHeader";
import PageContent from "../PageContent";
import SideMenu from "../SideMenu";

function MenuView() {
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </div>
      <AppFooter/>
    </div>
  );
}

export default MenuView;