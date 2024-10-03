import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NewsletterPage.css";
import Modal from "../../layout/Modal/Modal.jsx";
import TopTitle from "../../layout/TopTitle/TopTitle.jsx";
import NewsletterCard from "../../components/NewsletterCard/NewsletterCard.jsx";
import SettingsPage from "../../pages/SettingsPage/SettingsPage.jsx";
import {
  fetchAllNewsletters,
  requestOtp,
  verifyOtp,
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  getUserSubscription,
} from "../../services/apis.js";

const NewsletterSubscription = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [verificationID, setVerificationID] = useState(null);
  const [userId, setUserId] = useState(0);
  const [subscriptions, setSubscriptions] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const [isGuestUser, setIsGuestUser] = useState(false);
  const [messageEN, setMessageEN] = useState("");
  const [loading, setLoading] = useState(false);
  const [pasteOtp, setPasteOtp] = useState(new Array(6).fill(""));
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const handleSettingsClick = () => {
    setShowSettings((prev) => !prev);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const value = e.clipboardData.getData("Text");
    const updatedValue = value.toString().split("").slice(0, pasteOtp.length);
    setPasteOtp(updatedValue);

    const focusedInput = e.target.parentNode.querySelector("input:focus");
    if (focusedInput) {
      focusedInput.blur();
    }
  };

  const langId = lang === "ar" ? 1 : 2;

  const {
    data: newsletters,
    error: newslettersError,
    isLoading: isLoadingNewsletters,
  } = useQuery({
    queryKey: ["newsletters", lang],
    queryFn: () => fetchAllNewsletters(langId),
  });

  const {
    data: userSubscriptions,
    error: subscriptionsError,
    isLoading: isLoadingSubscriptions,
  } = useQuery({
    queryKey: ["userSubscriptions", userId, lang],
    queryFn: () => getUserSubscription(userId, langId),
    enabled: !!userId,
    onSuccess: (response) => {
      const subscriptionStatus = {};
      if (Array.isArray(response.data)) {
        response.data.forEach((item) => {
          subscriptionStatus[item.preferenceID] = item.isSubscribed;
        });
      }
      setSubscriptions(subscriptionStatus);

      if (response.registrationLink) {
        setIsGuestUser(true);
        setMessageEN(response.messageEn);
      } else {
        setIsGuestUser(false);
        setMessageEN("");
      }
    },
    onError: (error) => {
      console.error("Failed to fetch user subscriptions:", error);
    },
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userIdFromUrl = queryParams.get("userId") || "0";

    if (userIdFromUrl === "0") {
      setSubscriptions({});
      setMessageEN("");
      return;
    }

    if (userIdFromUrl) {
      setUserId(userIdFromUrl);
      const savedSubscriptions = localStorage.getItem(
        `subscriptions_${userIdFromUrl}`
      );
      if (savedSubscriptions) {
        setSubscriptions(JSON.parse(savedSubscriptions));
      }
    } else {
      setSubscriptions({});
      setMessageEN("");
    }
  }, [location.search, lang, langId]);

  useEffect(() => {
    if (Object.keys(subscriptions).length === 0 && userId !== "0") {
      navigate(`/${lang}?userId=${userId}`);
    }
  }, [subscriptions, userId, lang, navigate]);

  const { mutate: handleRequestOtp } = useMutation({
    mutationFn: requestOtp,
    onSuccess: (data) => {
      setVerificationID(data.regitserVerificationID);
      toast.success(t("otp_request_success", { message: data.message }), {
        autoClose: 500,
      });
    },
    onError: (error) => {
      console.error("Error sending OTP:", error);
      toast.error(t("otp_request_failure"), { autoClose: 500 });
    },
  });

  const { mutate: handleVerifyOtp } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      setUserId(data.userId);
      setIsVerified(true);
      toast.success(t("otp_verified_success"), { autoClose: 500 });
      if (selectedNewsletter) {
        handleSubscribe({
          userId: data.userId,
          preferenceID: selectedNewsletter.preferenceID,
        });
      }
      // Redirect to the appropriate argaamLogin URL based on the current language
      // const argaamLoginUrl = data.argaamLogin.replace(
      //   /lang=\w+/,
      //   `lang=${i18n.language}`
      // );
      // window.location.href = argaamLoginUrl;
    },
    onError: (error) => {
      console.error("Error verifying OTP:", error);
      toast.error(t("otp_verified_failure"), { autoClose: 500 });
    },
  });

  const { mutate: handleSubscribe } = useMutation({
    mutationFn: subscribeToNewsletter,
    onMutate: () => setLoading(true),
    onSuccess: (data, variables) => {
      toast.success(t("subscription_success"), { autoClose: 500 });
      setShowModal(false);
      setSubscriptions((prev) => ({
        ...prev,
        [variables.preferenceID]: true,
      }));
      localStorage.setItem(
        `subscriptions_${userId}`,
        JSON.stringify({
          ...subscriptions,
          [variables.preferenceID]: true,
        })
      );
      if (userId === "0") {
        navigate(`/${lang}?userId=${data.userId}`); // Update the URL with the new userId
      }
    },
    onError: (error) => {
      console.error("Error subscribing to newsletter:", error);
      toast.error(t("subscription_failure"), { autoClose: 500 });
    },
    onSettled: () => setLoading(false),
  });

  const { mutate: handleUnsubscribe } = useMutation({
    mutationFn: unsubscribeFromNewsletter,
    onMutate: () => setLoading(true),
    onSuccess: (data, variables) => {
      toast.success(t("unsubscription_success"), { autoClose: 500 });
      setSubscriptions((prev) => ({
        ...prev,
        [variables.preferenceID]: false,
      }));
      localStorage.setItem(
        `subscriptions_${userId}`,
        JSON.stringify({
          ...subscriptions,
          [variables.preferenceID]: false,
        })
      );
    },
    onError: (error) => {
      console.error("Error unsubscribing from newsletter:", error);
      toast.error(t("unsubscription_failure"), { autoClose: 500 });
    },
    onSettled: () => setLoading(false),
  });

  const handleSubscribeClick = (newsletter) => {
    setSelectedNewsletter(newsletter);
    if (userId) {
      if (subscriptions[newsletter.preferenceID]) {
        handleUnsubscribe({ userId, preferenceID: newsletter.preferenceID });
      } else {
        handleSubscribe({ userId, preferenceID: newsletter.preferenceID });
      }
    } else if (!isVerified) {
      setShowModal(true);
    }
  };

  const handleOtpChange = (e, index) => {
    setPasteOtp([
      ...pasteOtp.map((data, indx) => (indx === index ? e.target.value : data)),
    ]);
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const isSubscribed = Object.values(subscriptions).some(
    (isSubscribed) => isSubscribed
  );

  return (
    <>
      <div className="container mt-5">
        <TopTitle 
          isSubscribed={isSubscribed} 
          userId={userId} 
          showSettings={showSettings} 
          handleSettingsClick={handleSettingsClick} 
        />

        {isGuestUser && messageEN && (
          <div className="alert alert-warning">
            <p>{messageEN}</p>
            {userSubscriptions?.registrationLink && (
              <p>
                <a
                  href={userSubscriptions.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("complete_registration_here")}
                </a>
              </p>
            )}
          </div>
        )}

        {isLoadingNewsletters && <p>{t("loading_newsletters")}</p>}
        {newslettersError && (
          <p>
            {t("error_loading_newsletters", {
              message: newslettersError.message,
            })}
          </p>
        )}
        {isLoadingSubscriptions && <p>{t("loading_subscriptions")}</p>}
        {subscriptionsError && (
          <p>
            {t("error_loading_subscriptions", {
              message: subscriptionsError.message,
            })}
          </p>
        )}

        {showSettings ? <SettingsPage/> : 
          <NewsletterCard
          newsletters={newsletters}
          subscriptions={subscriptions}
          handleSubscribeClick={handleSubscribeClick}
          loading={loading}
        />}

        

        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          verificationID={verificationID}
          email={email}
          setEmail={setEmail}
          pasteOtp={pasteOtp}
          handlePaste={handlePaste}
          handleOtpChange={handleOtpChange}
          handleRequestOtp={handleRequestOtp}
          handleVerifyOtp={handleVerifyOtp}
        />
      </div>
    </>
  );
};

export default NewsletterSubscription;
