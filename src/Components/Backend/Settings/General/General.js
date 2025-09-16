import { __ } from "@wordpress/i18n";
import { PanelBody, SelectControl } from "@wordpress/components";
import { themeSwitch } from "../../../../utils/functions";
import { themeOption } from '../../../../utils/options';
import { ItemsPanel } from '../../../../../../bpl-tools/Components';
import ServiceItemPanel from '../../ServiceItemPanel/ServiceItemPanel';
//import { ColorControl } from '../../../../../../bpl-tools/Components';

const General = ({ attributes, setAttributes }) => {

  const { theme, activeIndex } = attributes;

  return (
    <>
      <PanelBody
        className="bPlPanelBody"
        title={__("Theme Switch", "service-card")}
        initialOpen={false}
      >
        <SelectControl
          labelPosition="left"
          value={theme}
          options={themeOption}
          onChange={(v) => setAttributes(themeSwitch(v, attributes))}
        />

      </PanelBody>
      <PanelBody
        className="bPlPanelBody"
        title={__("Service Card Content", "service-card")}
        initialOpen={true}
      >
        <ItemsPanel
          {...{ attributes, setAttributes }}
          arrKey="serviceData"
          activeIndex={activeIndex}
          newItem={{
            "id": 1,
            "title": "Web Development",
            "description": "Build modern, responsive websites and web applications using the latest technologies and best practices to deliver exceptional user experiences.",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-code\"><path d=\"m16 18 6-6-6-6\"/><path d=\"m8 6-6 6 6 6\"/></svg>"
          }}
          ItemSettings={ServiceItemPanel}
          design="sortable"
          title='title'
        />

      </PanelBody>
    </>
  );
};

export default General;
