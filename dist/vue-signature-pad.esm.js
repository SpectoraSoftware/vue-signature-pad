import SignaturePad from"signature_pad";import mergeImages from"merge-images";var SAVE_TYPE=["image/png","image/jpeg","image/svg+xml"],checkSaveType=function(a){return SAVE_TYPE.includes(a)},DEFAULT_OPTIONS={dotSize:3/2,minWidth:.5,maxWidth:2.5,throttle:16,minDistance:5,backgroundColor:"rgba(0,0,0,0)",penColor:"black",velocityFilterWeight:.7,onBegin:function(){},onEnd:function(){}},convert2NonReactive=function(a){return JSON.parse(JSON.stringify(a))},TRANSPARENT_PNG={src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",x:0,y:0},VueSignaturePad={name:"VueSignaturePad",props:{width:{type:String,default:"100%"},height:{type:String,default:"100%"},customStyle:{type:Object},saveType:{type:String,default:"image/png"},options:{type:Object,default:function(){return{}}},images:{type:Array,default:function(){return[]}}},data:function(){return{signaturePad:{},cacheImages:[],signatureData:TRANSPARENT_PNG,onResizeHandler:null}},mounted:function(){var a=this,b=a.options,c=this.$refs.signaturePadCanvas,d=new SignaturePad(c,Object.assign({},DEFAULT_OPTIONS,b));this.signaturePad=d,this.onResizeHandler=this.resizeCanvas.bind(this),window.addEventListener("resize",this.onResizeHandler,!1),this.resizeCanvas()},beforeDestroy:function(){this.onResizeHandler&&window.removeEventListener("resize",this.onResizeHandler,!1)},methods:{resizeCanvas:function(){var a=this.$refs.signaturePadCanvas,b=this.signaturePad.toData(),c=Math.max(window.devicePixelRatio||1,1);a.width=a.offsetWidth*c,a.height=a.offsetHeight*c,a.getContext("2d").scale(c,c),this.signaturePad.clear(),this.signatureData=TRANSPARENT_PNG,this.signaturePad.fromData(b)},saveSignature:function(){var a=this,b=a.signaturePad,c=a.saveType,d={isEmpty:!1,data:void 0};if(!checkSaveType(c))throw new Error("Image type is incorrect!");return b.isEmpty()?Object.assign({},d,{isEmpty:!0}):(this.signatureData=b.toDataURL(c),Object.assign({},d,{data:this.signatureData}))},undoSignature:function(){var a=this,b=a.signaturePad,c=b.toData();if(c)return b.fromData(c.slice(0,-1))},mergeImageAndSignature:function(a){return this.signatureData=a,mergeImages(this.images.concat(this.cacheImages,[this.signatureData]))},addImages:function(a){return void 0===a&&(a=[]),this.cacheImages=this.cacheImages.concat(a),mergeImages(this.images.concat(this.cacheImages,[this.signatureData]))},fromDataURL:function(a,b,c){return void 0===b&&(b={}),this.signaturePad.fromDataURL(a,b,c)},fromData:function(a){return this.signaturePad.fromData(a)},toData:function(){return this.signaturePad.toData()},lockSignaturePad:function(){return this.signaturePad.off()},openSignaturePad:function(){return this.signaturePad.on()},isEmpty:function(){return this.signaturePad.isEmpty()},getPropImagesAndCacheImages:function(){return this.propsImagesAndCustomImages},clearCacheImages:function(){return this.cacheImages=[],this.cacheImages},clearSignature:function(){return this.signaturePad.clear()}},computed:{propsImagesAndCustomImages:function(){var a=convert2NonReactive(this.images),b=convert2NonReactive(this.cacheImages);return a.concat(b)}},watch:{options:function(a){var b=this;Object.keys(a).forEach(function(c){b.signaturePad[c]&&(b.signaturePad[c]=a[c])})}},render:function(a){var b=this,c=b.width,d=b.height,e=b.customStyle;return a("div",{style:Object.assign({},{width:c,height:d},e)},[a("canvas",{style:{width:"100%",height:"100%"},ref:"signaturePadCanvas"})])}};VueSignaturePad.install=function(a){return a.component(VueSignaturePad.name,VueSignaturePad)},"undefined"!=typeof window&&window.Vue&&window.Vue.use(VueSignaturePad);export default VueSignaturePad;
