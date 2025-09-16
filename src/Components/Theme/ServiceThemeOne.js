
export default function ServiceThemeOne({ attributes }) {

    const { serviceData = [] } = attributes;


    return (
        <div className='serviceContainer serviceThemeOne'>
            <div className="cards-grid">
                {
                    serviceData?.length > 0 && serviceData.map((item, idx) => {
                        return (
                            <div key={idx} className="card-vertical">
                                <div className="icon-wrapper">
                                    <p
                                        className="icon"
                                        dangerouslySetInnerHTML={{ __html: item?.icon }}
                                    />
                                </div>
                                <h3 className="card-title">{item?.title}</h3>
                                <p className="card-description">{item?.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
