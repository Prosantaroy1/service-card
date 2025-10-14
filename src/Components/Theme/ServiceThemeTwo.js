
export default function ServiceThemeTwo({ attributes, setAttributes, isPremium }) {

    const { serviceData = [], Styles = {} } = attributes;
    const { cardBody } = Styles;
    const { icon, title, description } = cardBody;

    const handleUpgradeClick = () => {
        window.open("https://yoursite.com/upgrade", "_blank"); // ✅ তোমার upgrade পেজ URL
    };

    return (
        <div className='serviceContainer serviceThemeTwo' style={{ position: "relative" }}>
            <div className="card-grid">
                {
                    serviceData?.length > 0 && serviceData.map((item, index) => {
                        return (
                            <div key={index} className="card-vertical" onClick={() => setAttributes({ activeIndex: index })}>
                                {
                                    icon?.show === false &&
                                    <div className="icon-wrapper">
                                        <span
                                            className="icon"
                                            dangerouslySetInnerHTML={{ __html: item?.icon }}
                                        />
                                    </div>
                                }

                                <div className="content-section">
                                    {
                                        title?.show === false &&
                                        <h3 className="card-title">{item?.title}</h3>
                                    }
                                    {
                                        description?.show === false &&
                                        <p className="card-description">{item?.description}</p>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {/* 🔒 Overlay (only when NOT premium) */}
            {!isPremium && (
                <div className="premium-overlay">
                    <div className="premium-overlay-inner">
                        <h3>🔒 Premium Feature</h3>
                        <p>This feature is available in the Pro version.</p>
                        <button className="upgrade-btn" onClick={handleUpgradeClick}>
                            Upgrade Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
