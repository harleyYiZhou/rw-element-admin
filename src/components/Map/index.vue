<template>
    <div style="height: 100%;">
        <div id="container"> </div>
        <div class="selectedArea">
            <button @click="selectedArea">选定区域</button>
        </div>
        <div class="selectArea">
            <button @click="area">选择区域</button>
        </div>
    </div>
</template>

<script>
export default {
  name: "BaiduMap",
  data() {
    return {
      map: "",
      rectangle: "",
      showArea: false,
      checkBox: false
    };
  },
  mounted() {
    this.ready();
  },
  methods: {
    ready: function() {
      var that = this;
      that.map = new BMap.Map("container");
      var point = new BMap.Point(116.387112, 39.920977);
      that.map.centerAndZoom(point, 15);
      that.map.addControl(new BMap.MapTypeControl());
      that.map.enableScrollWheelZoom(true);
      that.map.enableDoubleClickZoom(true);

      //添加点聚合
      var markers = [];
      var max = 10;
      var pt = null;
      var i = 0;
      for (; i < max; i++) {
        pt = new BMap.Point(Math.random() * 40 + 85, Math.random() * 30 + 21);
        markers.push(new BMap.Marker(pt));
      }

      var markerClusterer = new BMapLib.MarkerClusterer(that.map, {
        markers: markers
      });
      // that.map.addOverlay(markerClusterer);
      //定义marker和其自定义窗口
      var sContent = `<div style="text-align:left;">
      <h4>设备名称</h4>
      <div>
        <div style="display: flex;">
          <div style="flex: 0.5">
            <div>状态：</div>
            <div>?</div>
          </div>
          <div style="flex: 0.5">
            <div>模式：</div>
            <div>AUTO</div>
          </div>
        </div>
      </div>
      <div>
        <div style="display: flex;">
          <div style="flex: 0.5">
          </div>
          <div style="flex: 0.5">
            <div>水平：</div>
            <div>off</div>
          </div>
        </div>
      </div>
    </div>`;
      var infoWindow = new BMap.InfoWindow(sContent);

      var marker = new BMap.Marker(point);
      that.map.addOverlay(marker);
      marker.addEventListener("mouseover", function() {
        this.openInfoWindow(infoWindow);
      });
      marker.addEventListener("mouseout", function() {
        this.closeInfoWindow(infoWindow);
      });
      var bs = that.map.getBounds(); //获取可视区域
      var pStart = bs.getSouthWest(); //可视区域左下角
      var pEnd = bs.getNorthEast(); //可视区域右上角

      //定义一个缩放平移控件
      var top_left_navigation = new BMap.NavigationControl();
      that.map.addControl(top_left_navigation);

      // 定义一个控件类,即function
      function ZoomControl() {
        // 默认停靠位置和偏移量
        this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
        this.defaultOffset = new BMap.Size(12, 36);
      }

      // 通过JavaScript的prototype属性继承于BMap.Control
      ZoomControl.prototype = new BMap.Control();

      // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
      // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
      ZoomControl.prototype.initialize = function(map) {
        //styleJson
        var styleJson = [
          {
            featureType: "scenicspotslabel",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "educationlabel",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "medicallabel",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "poilabel",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          }
        ];

        // 创建一个DOM元素
        var p = document.createElement("p");
        var input = document.createElement("input");
        // 设置样式
        p.style.fontSize = "9px";
        p.style.background = "#fff";
        input.style.cursor = "pointer";
        input.type = "checkbox";
        input.checked = that.checkBox;
        // 添加文字说明
        p.appendChild(input);
        p.appendChild(document.createTextNode("旅游景点"));
        // 绑定事件,点击一次放大两级
        p.onclick = function(e) {
          that.checkBox = !that.checkBox;
          if (that.checkBox) {
            that.map.setMapStyle({
              styleJson: styleJson
            });
          } else {
            that.map.setMapStyle({
              styleJson: []
            });
          }
        };
        // 添加DOM元素到地图中
        map.getContainer().appendChild(p);
        // 将DOM元素返回
        return p;
      };
      // 创建控件
      var myZoomCtrl = new ZoomControl();
      // 添加到地图当中
      that.map.addControl(myZoomCtrl);

      //地图滚动监听
      that.map.addEventListener("zoomend", function() {
        if (that.showArea == true) {
          that.map.removeOverlay(that.rectangle);
          bs = that.map.getBounds();
          pStart = bs.getSouthWest();
          pEnd = bs.getNorthEast();
          that.rectangle = new BMap.Polygon(
            [
              new BMap.Point(pStart.lng, pStart.lat),
              new BMap.Point(pEnd.lng, pStart.lat),
              new BMap.Point(pEnd.lng, pEnd.lat),
              new BMap.Point(pStart.lng, pEnd.lat)
            ],
            { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.8 }
          ); //创建矩形
          that.map.addOverlay(that.rectangle);
        }
      });

      //地图拖动监听
      that.map.addEventListener("moveend", function() {
        if (that.showArea == true) {
          that.map.removeOverlay(that.rectangle);
          bs = that.map.getBounds();
          pStart = bs.getSouthWest();
          pEnd = bs.getNorthEast();
          that.rectangle = new BMap.Polygon(
            [
              new BMap.Point(pStart.lng, pStart.lat),
              new BMap.Point(pEnd.lng, pStart.lat),
              new BMap.Point(pEnd.lng, pEnd.lat),
              new BMap.Point(pStart.lng, pEnd.lat)
            ],
            { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.8 }
          ); //创建矩形
          that.map.addOverlay(that.rectangle);
        }
      });
    },
    //划定区域并传参
    selectedArea: function() {
      this.map.removeOverlay(this.rectangle);
      var pStart = this.map.getBounds().getSouthWest();
      var pEnd = this.map.getBounds().getNorthEast();
      console.log(pStart, pEnd);
      this.showArea = false;
      alert(
        `该区域的经纬度区域为(${pStart.lng},${pStart.lat})-(${pEnd.lng},${
          pEnd.lat
        })`
      );
    },
    //选择区域
    area: function() {
      var that = this;
      this.showArea = true;
      //获取整个地图的大小
      that.map.removeOverlay(that.rectangle);
      var bs = that.map.getBounds();
      var pStart = bs.getSouthWest();
      var pEnd = bs.getNorthEast();
      that.rectangle = new BMap.Polygon(
        [
          new BMap.Point(pStart.lng, pStart.lat),
          new BMap.Point(pEnd.lng, pStart.lat),
          new BMap.Point(pEnd.lng, pEnd.lat),
          new BMap.Point(pStart.lng, pEnd.lat)
        ],
        { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.8 }
      ); //创建矩形
      that.map.addOverlay(that.rectangle);
    },
    //点击设备|区域，地图跳转至
    jumpToArea: function(latMin, latMax, lngMin, lngMax) {
      var that = this;
      var poly = new BMap.Polygon(
        [
          new BMap.Point(latMin, lngMin),
          new BMap.Point(latMax, lngMin),
          new BMap.Point(latMax, lngMax),
          new BMap.Point(latMin, lngMax)
        ],
        { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.8 }
      );
      that.map.setViewport(poly.getPath());
    }
  }
};
</script>

<style lang="scss"  scoped>
#container {
  width: 100%;
  height: calc(100vh - 84px);
}
.hideNavbar{
    #container{
        height: calc(100vh);
    }
}

.selectedArea {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
}
.selectArea{
    position: absolute;
    bottom: 0;
    left: 0;
    width:100%;
    text-align: center;
}
button {
  text-align: center;
}
</style>
