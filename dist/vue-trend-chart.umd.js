(function(i,m){typeof exports=="object"&&typeof module<"u"?module.exports=m(require("vue")):typeof define=="function"&&define.amd?define(["vue"],m):(i=typeof globalThis<"u"?globalThis:i||self,i.VueTrendChart=m(i.Vue))})(this,function(i){"use strict";const m=e=>{const t=e.split(" ").filter(s=>s!=="").map(s=>parseInt(s));return t.length<1||t.length>4?!1:t.every(s=>typeof s=="number"&&s>=0)},b=e=>{const t=e.split(" ").filter(s=>s!=="").map(s=>parseInt(s));switch(t.length){case 4:return{top:t[0],right:t[1],bottom:t[2],left:t[3]};case 3:return{top:t[0],right:t[1],bottom:t[2],left:t[1]};case 2:return{top:t[0],right:t[1],bottom:t[0],left:t[1]};default:return{top:t[0],right:t[0],bottom:t[0],left:t[0]}}},p={name:"TrendChartGrid",props:{boundary:{required:!0,type:Object},verticalLines:{default:!1,type:Boolean},verticalLinesNumber:{default:0,type:Number},horizontalLines:{default:!1,type:Boolean},horizontalLinesNumber:{default:0,type:Number}},methods:{setVerticalLinesParams(e){const{boundary:t,verticalLinesNumber:s}=this,a=s>1?(t.maxX-t.minX)/(s-1):0,n=t.minX+a*(e-1),r=t.minY,h=t.maxY;return{x1:n,x2:n,y1:r,y2:h,stroke:"rgba(0,0,0,0.1)"}},setHorizontalLinesParams(e){const{boundary:t,horizontalLinesNumber:s}=this,a=s>1?(t.maxY-t.minY)/(s-1):0,n=t.maxY-a*(e-1),r=t.minX,h=t.maxX;return{x1:r,x2:h,y1:n,y2:n,stroke:"rgba(0,0,0,0.1)"}}},render(){if(!this.verticalLines&&!this.horizontalLines)return;const e=[];if(this.verticalLines&&this.verticalLinesNumber>0){const t=[];for(let s=1;s<=this.verticalLinesNumber;s++)t.push(i.h("line",{class:"line",...this.setVerticalLinesParams(s)}));e.push(i.h("g",{class:"vertical"},t))}if(this.horizontalLines&&this.horizontalLinesNumber>0){const t=[];for(let s=1;s<=this.horizontalLinesNumber;s++)t.push(i.h("line",{class:"line",...this.setHorizontalLinesParams(s)}));e.push(i.h("g",{class:"horizontal"},t))}return i.h("g",e)}},f={name:"TrendChartLabels",props:{boundary:{required:!0,type:Object},minValue:{type:Number},maxValue:{type:Number},xLabels:{type:Array},yLabels:{type:Number},yLabelsTextFormatter:{default:e=>e,type:Function}},data(){return{xLabelHeight:null,yLabelHeight:null}},methods:{setXLabelsParams(e){const{boundary:t,xLabels:s}=this,a=(t.maxX-t.minX)/(s.length-1),n=t.minX+a*e,r=t.maxY;return{transform:`translate(${n}, ${r})`}},setYLabelsParams(e){const{boundary:t,yLabels:s}=this,a=(t.maxY-t.minY)/(s-1),n=t.minX,r=t.maxY-a*e;return{transform:`translate(${n}, ${r})`}}},mounted(){this.xLabels&&this.xLabels.length&&(this.xLabelHeight=this.$refs.xLabels.querySelector("text").getBoundingClientRect().height),this.yLabels&&this.yLabels>0&&(this.yLabelHeight=this.$refs.yLabels.querySelector("text").getBoundingClientRect().height)},render(){if(!(this.xLabels&&this.xLabels.length)&&!(this.yLabels&&this.yLabels>0))return;const e=[];if(this.xLabels&&this.xLabels.length&&e.push(i.h("g",{class:"x-labels",ref:"xLabels"},this.xLabels.map((t,s)=>i.h("g",{class:"label",...this.setXLabelsParams(s)},[i.h("text",{dy:this.xLabelHeight+5,"text-anchor":"middle"},t),i.h("line",{stroke:"rgba(0,0,0,0.1)",y2:5})])))),this.yLabels&&this.yLabels>0){const t=[];for(let s=0;s<this.yLabels;s++)t.push(i.h("g",{class:"label",...this.setYLabelsParams(s)},[i.h("text",{dx:-10,dy:this.yLabelHeight/4,"text-anchor":"end"},this.yLabelsTextFormatter(this.minValue+(this.maxValue-this.minValue)/(this.yLabels-1)*s)),i.h("line",{stroke:"rgba(0,0,0,0.1)",x1:0,x2:-5})]));e.push(i.h("g",{class:"y-labels",ref:"yLabels"},t))}return i.h("g",e)}},x=(e,t,s,a,n)=>{e=e.map(o=>typeof o=="number"?o:o.value);const r=a-.001,h=(t.maxX-t.minX)/(n-1),l=(t.maxY-t.minY)/(s+.001-r);return e.map((o,c)=>({x:c*h+t.minX,y:t.maxY-(o-r)*l+ +(c===n-1)*1e-5-+(c===0)*1e-5}))},g=(e,t,{maxY:s})=>{const a=[...e],n=a.shift(),r=a[a.length-1],l=(a[0].x-n.x)/2;let o=`M ${n.x},${n.y}`;a.forEach((u,v)=>{if(!t)o+=` L${u.x},${u.y}`;else{const d=a[v-1]||n;o+=` C ${l+d.x},${d.y} ${l+d.x},${u.y} ${u.x},${u.y}`}});let c=o;return r.Y!==s&&(c+=` L${r.x},${s}`),n.Y!==s&&(c+=` L${n.x},${s}`),c+=" Z",{linePath:o,fillPath:c}},y={name:"TrendChartCurve",props:{boundary:{required:!0,type:Object},minValue:{required:!0,type:Number},maxValue:{required:!0,type:Number},maxAmount:{required:!0,type:Number},activeLineParams:{type:Object},data:{required:!0,type:Array},className:{type:String},smooth:{default:!1,type:Boolean},stroke:{default:!0,type:Boolean},fill:{default:!1,type:Boolean},showPoints:{default:!1,type:Boolean}},computed:{points(){return x(this.data,this.boundary,this.maxValue,this.minValue,this.maxAmount)},paths(){return g(this.points,this.smooth,this.boundary)}},render(){const e=[];return this.fill&&this.paths&&this.paths.fillPath&&e.push(i.h("path",{class:"fill",d:this.paths.fillPath,fill:"rgba(0,0,0,0.15)"})),this.stroke&&this.paths&&this.paths.linePath&&e.push(i.h("path",{class:"stroke",d:this.paths.linePath,fill:"none",stroke:"black"})),this.showPoints&&this.points&&e.push(i.h("g",{class:"points"},this.points.map((t,s)=>i.h("circle",{class:{point:!0,"is-active":this.activeLineParams&&this.activeLineParams.index===s},cx:t.x,cy:t.y,r:2,stroke:"#000000","stroke-width":1})))),i.h("g",{class:this.className},e)}},L={name:"TrendChart",emits:["mouse-move"],components:{TrendChartGrid:p,TrendChartLabels:f,TrendChartCurve:y},props:{datasets:{required:!0,type:Array},grid:{default:null,type:Object},labels:{default:null,type:Object},max:{type:Number},min:{type:Number},padding:{default:"5",type:String,validator(e){return m(e)}},interactive:{default:!1,type:Boolean}},data(){return{width:null,height:null,labelsOverflowObject:{top:0,right:0,bottom:0,left:0},activeLine:null,activeLineParams:null}},computed:{paddingObject(){return this.padding?b(this.padding):b("0")},boundary(){const{width:e,height:t,paddingObject:s,labelsOverflowObject:a}=this;return{minX:s.left+a.left,minY:s.top+a.top,maxX:e-s.right-a.right,maxY:t-s.bottom-a.bottom}},params(){let e=-1/0,t=1/0,s=0;return this.datasets.forEach(a=>{let n=a.data.map(l=>typeof l=="number"?l:l.value),r=Math.max(...n);r>e&&(e=r);let h=Math.min(...n);h<t&&(t=h),n.length>s&&(s=n.length)}),this.max!==void 0&&this.max>e&&(e=this.max),this.min!==void 0&&this.min<t&&(t=this.min),{maxValue:e,minValue:t,maxAmount:s}},chartOverlayParams(){const{boundary:e}=this,t=e.maxX-e.minX,s=e.maxY-e.minY;return{x:e.minX,y:e.minY,width:t>0?t:0,height:s>0?s:0,opacity:0}},chartAxesXCoords(){const e=[],t=(this.boundary.maxX-this.boundary.minX)/(this.params.maxAmount-1);for(let s=0;s<this.params.maxAmount;s++)e.push(t*s+this.boundary.minX);return e}},methods:{setSize(){if(this.$refs.chart){const e=this.$refs.chart.getBoundingClientRect();this.width=e.width,this.height=e.height}},fitLabels(){const e=this.$refs.chart,t=this.$refs.labels;if(t&&(t.xLabels&&t.xLabels.length||t.yLabels>0)){const s=e.getBoundingClientRect(),a=t.$el.getBoundingClientRect(),n=s.top-a.top+this.paddingObject.top,r=a.right-s.right+this.paddingObject.right,h=a.bottom-s.bottom+this.paddingObject.bottom,l=this.paddingObject.left-a.left+s.left;this.labelsOverflowObject={top:n>0?n:0,right:r>0?r:0,bottom:h>0?h:0,left:l>0?l:0}}else this.labelsOverflowObject={top:0,right:0,bottom:0,left:0}},init(){this.setSize(),i.nextTick(()=>{this.fitLabels()})},getNearestCoordinate(e){return this.chartAxesXCoords.reduce((t,s)=>Math.abs(t)>Math.abs(s-e)?s-e:t,1/0)+e},mouseMove(e){if(this.$refs.chart!==void 0){const t=this.$refs.chart.getBoundingClientRect();this.activeLine=this.getNearestCoordinate(e.clientX-t.left)}},mouseOut(){this.activeLine=null,this.activeLineParams=null},onWindowResize(){this.setSize()}},watch:{activeLine(e){const t=[];e&&(this.activeLineParams={index:this.chartAxesXCoords.indexOf(this.activeLine)},this.datasets.forEach(s=>{t.push(s.data[this.activeLineParams.index])})),this.$emit("mouse-move",this.activeLineParams?{...this.activeLineParams,data:t}:null)},labels:{handler(){this.labelsOverflowObject={top:0,right:0,bottom:0,left:0},i.nextTick(()=>{this.fitLabels()})},deep:!0}},mounted(){this.init(),window.addEventListener("resize",this.onWindowResize)},destroyed(){window.removeEventListener("resize",this.onWindowResize)},render(){const e=[];return this.grid&&e.push(i.h(p,{class:"grid",verticalLines:this.grid.verticalLines,verticalLinesNumber:this.grid.verticalLinesNumber||this.params.maxAmount,horizontalLines:this.grid.horizontalLines,horizontalLinesNumber:this.grid.horizontalLinesNumber||this.labels&&this.labels.yLabels||0,boundary:this.boundary})),this.interactive&&this.chartOverlayParams&&e.push(i.h("line",{class:"active-line",ref:"active-line",x1:this.activeLine||this.boundary.minX,x2:this.activeLine||this.boundary.minX,y1:this.boundary.minY,y2:this.boundary.maxY,stroke:"black",visibility:this.activeLine?"visible":"hidden"})),this.labels&&e.push(i.h(f,{class:"labels",ref:"labels",...this.labels,boundary:this.boundary,minValue:this.params.minValue,maxValue:this.params.maxValue})),this.datasets.map(t=>{e.push(i.h(y,{class:"curve",...t,boundary:this.boundary,minValue:this.params.minValue,maxValue:this.params.maxValue,maxAmount:this.params.maxAmount,activeLineParams:this.activeLineParams}))}),this.interactive&&this.chartOverlayParams&&e.push(i.h("rect",{ref:"interactive-area",...this.chartOverlayParams,onmousemove:t=>this.mouseMove(t),onmouseout:()=>this.mouseOut()})),i.h("svg",{class:"vtc",ref:"chart",xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%"},e)}};return{install:(e,t)=>{e.component("TrendChart",L)}}});