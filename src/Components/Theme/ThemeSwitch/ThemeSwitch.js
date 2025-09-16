import ServiceThemeOne from '../ServiceThemeOne';
import ServiceThemeThree from '../ServiceThemeThree';
import ServiceThemeTwo from '../ServiceThemeTwo';


export default function ThemeSwitch({ attributes, setAttributes }) {

    const { theme = "default" } = attributes;

    return <ThemeChange theme={theme} {...{ attributes, setAttributes }} />
}

const ThemeChange = ({ theme, attributes, setAttributes }) => {
    switch (theme) {
        case 'themeTwo':
            return <ServiceThemeTwo {...{ attributes, setAttributes }} />
        case 'themeThree':
            return <ServiceThemeThree {...{ attributes, setAttributes }} />;

        default:
            return <ServiceThemeOne {...{ attributes, setAttributes }} />;

    }
}
