import { __ } from "@wordpress/i18n";
import { PanelBody, SelectControl } from "@wordpress/components";
import { purposeTypeOptions } from "../../../../utils/options";
import { updateData } from "../../../../utils/functions";
//import { ColorControl } from '../../../../../../bpl-tools/Components';

const General = ({ attributes, setAttributes }) => {


  return (
    <PanelBody
      className="bPlPanelBody"
      title={__("Purpose", "b-blocks")}
      initialOpen={false}
    >
      <SelectControl
        label={__("Purpose", "b-blocks")}
        labelPosition="left"
        value={''}
        options={purposeTypeOptions}
        onChange={(v) =>
          setAttributes({ purposeType: updateData('', v) })
        }
      />



    </PanelBody>
  );
};

export default General;
