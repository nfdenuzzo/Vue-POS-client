<template>
  <div class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <canvas
        v-show="imageCaptured"
        ref="canvas"
        class="full-width"
        height="240"
      />
      <q-img v-if="!imageCaptured && isEditing" :src="updatedMenuItemImage" />
    </div>
    <div class="text-center q-pa-md">
      <div class="col-xs-11 col-md-5 q-pa-md text-color text-weight-bold">
        <q-file
          dense
          v-model="imageUpload"
          @input="captureImageFallback"
          label="Choose an image"
          accept="image/*"
          outlined
        >
          <template v-slot:prepend>
            <q-icon name="far fa-image" />
          </template>
        </q-file>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "imagePage",
  props: {
    isEditing: {
      type: Boolean,
      default: false,
      required: false
    },
    menuItemImage: {
      required: false
    }
  },
  data() {
    return {
      resizedImageBase64: null,
      updatedMenuItemImage: null,
      imageCaptured: false,
      imageUpload: []
    };
  },
  mounted() {
    this.updatedMenuItemImage = this.menuItemImage;
  },
  computed: {},
  methods: {
    resetFields() {
      this.imageCaptured = false;
      this.imageUpload = [];
      this.resizedImageBase64 = null;
      this.updatedMenuItemImage = null;
      this.$emit("update:menuItemImage", null);
    },
    captureImageFallback(file) {
      let canvas = this.$refs.canvas;
      let context = canvas.getContext("2d");

      var reader = new FileReader();
      const that = this;
      try {
        reader.onload = event => {
          var img = new Image();
          img.onload = () => {
            let width = 360;
            let height = 280;
            if (img.height > img.width) {
              width = Math.floor(height * (img.width / img.height));
            } else {
              height = Math.floor(width * (img.height / img.width));
            }
            let resizingCanvas = document.createElement("canvas");
            let resizingCanvasContext = resizingCanvas.getContext("2d");
            // Start with original image size
            resizingCanvas.width = img.width;
            resizingCanvas.height = img.height;
            // Draw the original image on the (temp) resizing canvas
            resizingCanvasContext.drawImage(
              img,
              0,
              0,
              resizingCanvas.width,
              resizingCanvas.height
            );
            let curImageDimensions = {
              width: Math.floor(img.width),
              height: Math.floor(img.height)
            };
            let halfImageDimensions = {
              width: null,
              height: null
            };
            // Quickly reduce the size by 50% each time in few iterations until the size is less then
            // 2x time the target size - the motivation for it, is to reduce the aliasing that would have been
            // created with direct reduction of very big image to small image
            while (curImageDimensions.width * 0.5 > width) {
              // Reduce the resizing canvas by half and refresh the image
              halfImageDimensions.width = Math.floor(
                curImageDimensions.width * 0.5
              );
              halfImageDimensions.height = Math.floor(
                curImageDimensions.height * 0.5
              );
              resizingCanvasContext.drawImage(
                resizingCanvas,
                0,
                0,
                curImageDimensions.width,
                curImageDimensions.height,
                0,
                0,
                halfImageDimensions.width,
                halfImageDimensions.height
              );
              curImageDimensions.width = halfImageDimensions.width;
              curImageDimensions.height = halfImageDimensions.height;
            }
            // Now do final resize for the resizingCanvas to meet the dimension requirments
            // directly to the output canvas, that will output the final image
            let outputCanvas = document.createElement("canvas");
            let outputCanvasContext = outputCanvas.getContext("2d");
            outputCanvas.width = width;
            outputCanvas.height = height;
            outputCanvasContext.drawImage(
              resizingCanvas,
              0,
              0,
              curImageDimensions.width,
              curImageDimensions.height,
              0,
              0,
              width,
              height
            );
            that.resizedImageBase64 = outputCanvas.toDataURL(file.type, 0.7);
            that.$emit("update:menuItemImage", that.resizedImageBase64);

            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            this.imageCaptured = true;
          };
          img.src = event.target.result;
        };
      } catch (ex) {
        console.log("captureImageFallback -> ex", ex);
      }
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style></style>
