const Menu = () => {
  return (
    <>
      <div className="menu-section">
        <img src="./imgs/reza.jpg" alt="user-img" className="user-img" />
        <div className="user-name">رضا قزلسفلو</div>
        <span className="user-role">معلم مدرسه</span>
        <div className="divider"></div>
        <ul className="menu-items-container">
          <li>
            <a className="menu-item" href="#">
              صفحه کاربری
            </a>
          </li>
          <li>
            <a className="menu-item" href="#">
              خرید جدید
            </a>
          </li>
          <li>
            <a className="menu-item" href="#">
              تمرین‌های قبلی
            </a>
          </li>
          <li>
            <a className="menu-item" href="#">
              طراحی امتحان
            </a>
          </li>
          <li>
            <a className="menu-item" href="#">
              اضافه کردن سؤال
            </a>
          </li>
          <li>
            <a className="menu-item" href="#">
              تنظیمات
            </a>
          </li>
        </ul>
      </div>{" "}
    </>
  );
};

export default Menu;
