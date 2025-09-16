import { mobileBreakpoint, tabBreakpoint } from '../../../../bpl-tools/utils/data';
import { getBackgroundCSS, getBorderCSS, getBoxCSS, getColorsCSS, getShadowCSS, getTypoCSS, isValidCSS } from "../../../../bpl-tools/utils/getCSS"
const Style = ({ attributes, id, device }) => {


	const mainSl = `#${id}`;



	return <style dangerouslySetInnerHTML={{
		__html: `
		 
	

		 

	`}} />;
}
export default Style;


