import React from 'react';
import { useTranslation } from 'react-i18next';

const CurrentSubscriptions = ({ newsletters = [], subscriptions, handleSubscribeClick, loading }) => {
	const { t, i18n } = useTranslation(); // Initialize translation
	const currentLanguage = i18n.language; // Get the current language

	const subscribedNewsletters = newsletters.filter(newsletter => subscriptions[newsletter.preferenceID]);

	return (
		<div>
			{subscribedNewsletters.length > 0 ? (
				<div className="row justify-content-between p-2 m-0 py-3 mb-3 bg-light">
					{subscribedNewsletters.map(newsletter => (
						<div className="col-md-6 mb-2" key={newsletter.preferenceID}>
							<div className="card rounded-0 h-100">
								<div className="row g-0 h-100">
									<div className="col-md-5">
										<img
											src={newsletter.thumbnail}
											className="nl-image img-fluid img-card h-100"
											alt=""
											draggable="false"
										/>
									</div>
									<div className="col-md-7">
										<div className="card-body h-100 d-flex flex-column justify-content-between">
											<h4 className="mb-1 fw-bold" style={{ fontSize: "14px" }}>
                                            {currentLanguage === "ar" ? newsletter.nameAr : newsletter.nameEn}
											</h4>
											<p className="p-0 m-0 mb-1 mt-1" style={{ fontSize: "12px" }}>
                                            {currentLanguage === "ar" ? newsletter.descriptionAr : newsletter.descriptionEn}
											</p>
											<button
												className="btn btn-sm mt-2 btn-outline-danger"
												style={{ width: "120px" }}
												onClick={() => handleSubscribeClick(newsletter)}
												disabled={loading}
											>
												{t('unsubscribe')} {/* Translated button text */}
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<p>{t('no_subscriptions_found')}</p>
			)}
		</div>
	);
};

export default CurrentSubscriptions;