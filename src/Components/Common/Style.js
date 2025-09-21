import { deskBreakpoint, mobileBreakpoint, tabBreakpoint } from '../../../../bpl-tools/utils/data';
import { getBackgroundCSS, getBorderCSS, getBoxCSS, getColorsCSS, getMultiShadowCSS, getTypoCSS, } from "../../../../bpl-tools/utils/getCSS"

const Style = ({ attributes, id, device }) => {

	const { Styles = {}, column = {}, align } = attributes || {};
	const { SectionContainer, cardBody } = Styles;
	const { title, description, icon } = cardBody;

	const mainSl = `#${id}`;
	const blockSl = `${mainSl} .service-card-wrapper`;
	const wrapperSl = `${blockSl} .serviceContainer`;

	const layoutSl = `${wrapperSl} .card-grid`;
	const cardVerticalSl = `${layoutSl} .card-vertical`;
	const IconWrapperSl = `${wrapperSl} .icon-wrapper`;
	const IconlineSl = `${layoutSl} .icon-wrapper::after`
	const IconSl = `${cardVerticalSl} .icon svg`;
	const line = `${cardVerticalSl} .accent-line`
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
		  padding: ${getBoxCSS(SectionContainer?.padding?.[device])};
		  ${getBorderCSS(SectionContainer?.border)};
		  box-shadow: ${getMultiShadowCSS(SectionContainer?.shadow)};
		}
		
		${IconWrapperSl}{
		  ${getBackgroundCSS(icon?.bg)}
		}
		${IconlineSl}{
			${getBackgroundCSS(icon?.bg)}
		}
		${line}{
		  width: ${cardBody?.lined?.width};
		}
		${IconSl}{
		  fill: ${icon?.color};
	      width: ${icon?.size};
	      height: ${icon?.size};
		}

		${TitleSl}{
		  text-align : ${title?.textAlign};
		  padding: ${getBoxCSS(title?.padding?.desktop)};
		  margin: ${getBoxCSS(title?.margin?.[device])};
		  ${getColorsCSS(title?.colors)}
		}
		${tabBreakpoint}{ 
		   ${TitleSl}{ 
			   padding: ${getBoxCSS(title?.padding?.tablet)};
			} 
		}
		${mobileBreakpoint}{ 
		   ${TitleSl}{ 
			   padding: ${getBoxCSS(title?.padding?.mobile)};
			} 
		}
			
		${DescriptionSl}{
		   text-align: ${description?.textAlign};
		   padding: ${getBoxCSS(description?.padding?.desktop)};
		   ${getColorsCSS(description?.colors)}
		}
		${tabBreakpoint}{ 
		   ${DescriptionSl}{ 
			   padding: ${getBoxCSS(description?.padding?.tablet)};
			} 
		}
		${mobileBreakpoint}{ 
		   ${DescriptionSl}{ 
			   padding: ${getBoxCSS(description?.padding?.mobile)};
			} 
		}


	

	`}} />;
}
export default Style;


