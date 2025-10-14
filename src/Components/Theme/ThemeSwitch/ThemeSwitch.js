import ServiceThemeOne from '../ServiceThemeOne';
import ServiceThemeThree from '../ServiceThemeThree';
import ServiceThemeTwo from '../ServiceThemeTwo';


export default function ThemeSwitch({ attributes, setAttributes, isPremium }) {

    const { theme = "default" } = attributes;

    return <ThemeChange theme={theme} {...{ attributes, setAttributes, isPremium }} />
}

const ThemeChange = ({ theme, attributes, setAttributes, isPremium }) => {
    switch (theme) {
        case 'themeTwo':
            return <ServiceThemeTwo {...{ attributes, setAttributes, isPremium }} />
        case 'themeThree':
            return <ServiceThemeThree {...{ attributes, setAttributes, isPremium }} />;

        default:
            return <ServiceThemeOne {...{ attributes, setAttributes, isPremium }} />;

    }
}
