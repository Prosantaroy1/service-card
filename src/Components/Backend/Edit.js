import { useBlockProps } from "@wordpress/block-editor";
import Settings from "./Settings/Settings";
import Style from "../Common/Style";
import { withSelect } from "@wordpress/data";
import ThemeSwitch from '../Theme/ThemeSwitch/ThemeSwitch';
import ClipBoard from '../../shortcode/ClipBoard';


const Edit = (props) => {
  const { attributes, setAttributes, clientId, device, postId, postType } = props;

  console.log(postType)

  return (
    <>
      <Settings {...{ attributes, setAttributes }} clientId={clientId} device={device} />

      <div {...useBlockProps()}>
        <Style attributes={attributes} id={`block-${clientId}`} device={device} />

        <div className='service-card-wrapper'>
          {postType == "service_card" && (
            <ClipBoard shortcode={`[service_card id=${postId}]`} />
          )}
          <ThemeSwitch {...{ attributes, setAttributes }} />
        </div>

      </div>
    </>
  );
};
// export default Edit;

export default withSelect((select) => {
  const { getDeviceType, getCurrentPostId, getCurrentPostType } =
    select("core/editor");

  return {
    device: getDeviceType ? getDeviceType()?.toLowerCase() : "desktop",
    postType: getCurrentPostType(),
    postId: getCurrentPostId(),
  };
})(Edit);
