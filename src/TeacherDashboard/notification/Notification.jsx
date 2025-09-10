import { useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Horse Vaccination",
      body: "Horse 'Test Horse Tester' needs to take 1st Dose of Vaccine 'Black Nile Virus'.",
      month: "Aug",
      day: "04",
      isUnread: true,
    },
    {
      id: 2,
      title: "Horse Vaccination",
      body: "Horse 'Test Horse Tester' needs to take 1st Dose of Vaccine 'Black Nile Virus'.",
      month: "Aug",
      day: "04",
      isUnread: true,
    },
  ]);

  const [activeFilter, setActiveFilter] = useState("all");

  const unreadCount = notifications.filter((notif) => notif.isUnread).length;

  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return notif.isUnread;
    return true;
  });

  const toggleNotificationStatus = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isUnread: !notif.isUnread } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({
        ...notif,
        isUnread: false,
      }))
    );
  };

  return (
    <section id="pages" className="p-4">
      <h6 className="title-2 mb-3 dark:text-gray-100">Alerts Summary</h6>

      {/* Filters */}
      <div className="filters flex justify-between items-center">
        <ul className="nav filter-tabs flex gap-2">
          <li>
            <button
              className={`nav-link ${
                activeFilter === "all" ? "active " : "dark:text-gray-700"
              } dark:text-gray-200`}
              onClick={() => setActiveFilter("all")}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${
                activeFilter === "unread" ? "active" : "dark:text-gray-700"
              } dark:text-gray-200`}
              onClick={() => setActiveFilter("unread")}
            >
              Unread{" "}
              {unreadCount > 0 && (
                <span id="unreadCount">({unreadCount})</span>
              )}
            </button>
          </li>
        </ul>
        <button
          className="btn dark:text-gray-200"
          id="markAll"
          onClick={markAllAsRead}
        >
          <i className="fa-solid fa-check-double"></i>
          Mark all as read
        </button>
      </div>

      <div className=" mt-4" id="notifList">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-card ${
              notification.isUnread ? "unread" : "read"
            } dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 `}
          >
            <div className="flex flex-col sm:flex-row items-start p-3 gap-3 sm:gap-0 border rounded-lg dark:border-gray-600">
              <div className="notification-date mr-3 text-center">
                <span className="month block font-bold">
                  {notification.month}
                </span>
                <span className="day text-lg">{notification.day}</span>
              </div>
              <div className="notification-text flex-1">
                <h4 className="notification-title font-semibold">
                  {notification.title}
                </h4>
                <p className="notification-body dark:text-gray-300 text-sm opacity-80">
                  {notification.body}
                </p>
              </div>
              <div className="notification-actions flex items-center ml-2">
                <button
                  className=" text-sm underline text-sec"
                  type="button"
                  onClick={() => toggleNotificationStatus(notification.id)}
                >
                  {notification.isUnread ? "Mark as read" : "Mark as unread"}
                </button>
                {notification.isUnread && (
                  <span
                    className="notification-dot w-2 h-2 bg-red-500 rounded-full"
                    aria-hidden="true"
                  ></span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notifications;
