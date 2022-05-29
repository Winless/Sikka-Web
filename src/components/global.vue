<script>

let stageConfig = {
  stageWidth: 1,
  stageHeight: 1,
  scale: 1,
};

const openLog = false;


/**
 * pool price 精度
 * @type {number[]}
 */
const poolPrecisions = [2,2,4,3,6];




const openMsg = (notification,title, content, type, placement,duration) => {
  type = type || "success";
  placement = placement || "topRight";
  duration = duration || 4.5;
  if(notification&&notification[type]){
    notification[type]({
      message: title,
      description: content,
      placement,
      duration: duration,
    });
  }


}

export default {
  stageConfig,
  openLog,
  openMsg,
  poolPrecisions,
}

</script>