import { mobileBreakpoint, tabBreakpoint } from '../../../../bpl-tools/utils/data';
import { getBackgroundCSS, getBorderCSS, getBoxCSS, getColorsCSS, getShadowCSS, getTypoCSS, isValidCSS } from "../../../../bpl-tools/utils/getCSS"
const Style = ({ attributes, id, device }) => {


	const mainSl = `#${id}`;
	const blockSl = `${mainSl} .main-tp-div`;
	const paraSl = `${blockSl} .para`;
	const subTitleSl = `${blockSl} .subtitle`;
	const imgSl = `${blockSl} .Image`;

	const { textType, paraColor, BoxModelPadding, boxBackground, containerShadow, ImgHeigth, ImgWidth, subtitleColor, BoxBorderRadius, titleAlign, subtitleAlign, contentColors } = attributes;

	//const { boxBg } = boxBackground;

	console.log('contentColors style22----', contentColors)

	// const { fontFamily, fontCategory, fontStyle, fontVariant, textDecoration, textTransform } = textType;
	// //const { desktop , mobile } = fontSize;
	// //console.log(fontSize)


	return <style dangerouslySetInnerHTML={{
		__html: `
		 
		 ${getTypoCSS("", textType?.typo)?.googleFontLink} 

         ${getTypoCSS(paraSl, textType?.typo).styles} 
		 
		 ${paraSl} {
			color:  ${paraColor};
			text-align: ${titleAlign};
			background: ${getColorsCSS(contentColors)}
		 }
		 ${subTitleSl}{
		   color: ${subtitleColor};
			text-align: ${subtitleAlign}
		 }
		 ${blockSl}{
		   padding:${getBoxCSS(BoxModelPadding)};
		   ${getBackgroundCSS(boxBackground)}
		   box-shadow: ${getShadowCSS(containerShadow[0])};
		   border-radius: ${getBoxCSS(BoxBorderRadius)};
		 }
		${imgSl}{
		  width: ${ImgWidth};
		  height: ${ImgHeigth}; 
		}
		svg{
		    width: 28px;
           height: 28px;
		}

		 

	`}} />;
}
export default Style;


