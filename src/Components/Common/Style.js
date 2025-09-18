import { deskBreakpoint, mobileBreakpoint, tabBreakpoint } from '../../../../bpl-tools/utils/data';
import { getBackgroundCSS, getBorderCSS, getBoxCSS, getMultiShadowCSS, getTypoCSS, } from "../../../../bpl-tools/utils/getCSS"

const Style = ({ attributes, id }) => {

	const { Styles = {}, column = {}, align } = attributes || {};
	const { SectionContainer, cardBody } = Styles;
	const { title, description, icon } = cardBody;

	const mainSl = `#${id}`;
	const blockSl = `${mainSl} .service-card-wrapper`;
	const wrapperSl = `${blockSl} .serviceContainer`;

	const layoutSl = `${wrapperSl} .card-grid`;
	const cardVerticalSl = `${layoutSl} .card-vertical`;
	const IconWrapperSl = `${wrapperSl} .icon-wrapper`;
	const IconSl = `${cardVerticalSl} .icon svg`;
	const TitleSl = `${wrapperSl} .card-title`;
	const DescriptionSl = `${wrapperSl} .card-description`;

	return <style dangerouslySetInnerHTML={{
		__html: `

		${getTypoCSS("", cardBody.title.typo).googleFontLink}  
		${getTypoCSS("", cardBody.description.typo).googleFontLink}  

		${getTypoCSS(TitleSl, cardBody.title.typo).styles}  
		${getTypoCSS(DescriptionSl, cardBody.description.typo).styles}  


		${layoutSl}{
			gap: ${column?.gap}
		}
		${deskBreakpoint}{
		   ${layoutSl}{
		      grid-template-columns: repeat(${align ? column?.desktop : 3}, 1fr);
		   }
		}
		${tabBreakpoint}{ 
		   ${layoutSl}{ 
			   grid-template-columns: repeat(${align ? column?.tablet : 2}, 1fr);
			} 
		}
		${mobileBreakpoint}{ 
		   ${layoutSl}{ 
			   grid-template-columns: repeat(${align ? column?.mobile : 1}, 1fr);
			} 
		}

		${cardVerticalSl}{
		  ${getBackgroundCSS(SectionContainer?.bg)}
		  padding: ${getBoxCSS(SectionContainer?.padding?.desktop)};
		  ${getBorderCSS(SectionContainer?.border)};
		  box-shadow: ${getMultiShadowCSS(SectionContainer?.shadow)};
		}
		${IconWrapperSl}{
		  ${getBackgroundCSS(icon?.bg)}
		}
		${IconSl}{
		  fill: ${icon?.color};
	      width: ${icon?.size};
	      height: ${icon?.size};
		}

		${TitleSl}{
		  ${getBackgroundCSS(title?.bg)}
		  color: ${title?.colors};
		  text-align : ${title?.textAlign};
		}
		${DescriptionSl}{
		 color: ${description?.colors};
		 text-align: ${description?.textAlign}
		}


	

	`}} />;
}
export default Style;


