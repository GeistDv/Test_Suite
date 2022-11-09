/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 4.0, "minX": 0.0, "maxY": 935.0, "series": [{"data": [[0.0, 4.0], [0.1, 4.0], [0.2, 4.0], [0.3, 4.0], [0.4, 5.0], [0.5, 6.0], [0.6, 6.0], [0.7, 6.0], [0.8, 26.0], [0.9, 27.0], [1.0, 27.0], [1.1, 27.0], [1.2, 29.0], [1.3, 35.0], [1.4, 35.0], [1.5, 39.0], [1.6, 45.0], [1.7, 47.0], [1.8, 55.0], [1.9, 56.0], [2.0, 69.0], [2.1, 69.0], [2.2, 69.0], [2.3, 69.0], [2.4, 70.0], [2.5, 70.0], [2.6, 70.0], [2.7, 70.0], [2.8, 70.0], [2.9, 70.0], [3.0, 70.0], [3.1, 71.0], [3.2, 71.0], [3.3, 71.0], [3.4, 72.0], [3.5, 72.0], [3.6, 72.0], [3.7, 72.0], [3.8, 72.0], [3.9, 74.0], [4.0, 76.0], [4.1, 77.0], [4.2, 77.0], [4.3, 77.0], [4.4, 77.0], [4.5, 78.0], [4.6, 78.0], [4.7, 91.0], [4.8, 95.0], [4.9, 96.0], [5.0, 96.0], [5.1, 98.0], [5.2, 98.0], [5.3, 99.0], [5.4, 99.0], [5.5, 99.0], [5.6, 100.0], [5.7, 100.0], [5.8, 102.0], [5.9, 102.0], [6.0, 102.0], [6.1, 102.0], [6.2, 103.0], [6.3, 103.0], [6.4, 103.0], [6.5, 104.0], [6.6, 104.0], [6.7, 104.0], [6.8, 104.0], [6.9, 105.0], [7.0, 105.0], [7.1, 105.0], [7.2, 106.0], [7.3, 106.0], [7.4, 106.0], [7.5, 106.0], [7.6, 106.0], [7.7, 106.0], [7.8, 106.0], [7.9, 106.0], [8.0, 107.0], [8.1, 107.0], [8.2, 107.0], [8.3, 107.0], [8.4, 107.0], [8.5, 107.0], [8.6, 107.0], [8.7, 118.0], [8.8, 127.0], [8.9, 132.0], [9.0, 136.0], [9.1, 150.0], [9.2, 153.0], [9.3, 157.0], [9.4, 162.0], [9.5, 165.0], [9.6, 174.0], [9.7, 174.0], [9.8, 175.0], [9.9, 179.0], [10.0, 183.0], [10.1, 194.0], [10.2, 194.0], [10.3, 197.0], [10.4, 203.0], [10.5, 212.0], [10.6, 214.0], [10.7, 214.0], [10.8, 214.0], [10.9, 215.0], [11.0, 215.0], [11.1, 215.0], [11.2, 217.0], [11.3, 218.0], [11.4, 219.0], [11.5, 219.0], [11.6, 219.0], [11.7, 219.0], [11.8, 220.0], [11.9, 220.0], [12.0, 220.0], [12.1, 220.0], [12.2, 220.0], [12.3, 220.0], [12.4, 220.0], [12.5, 221.0], [12.6, 221.0], [12.7, 221.0], [12.8, 221.0], [12.9, 221.0], [13.0, 222.0], [13.1, 222.0], [13.2, 222.0], [13.3, 223.0], [13.4, 223.0], [13.5, 224.0], [13.6, 224.0], [13.7, 224.0], [13.8, 225.0], [13.9, 225.0], [14.0, 226.0], [14.1, 226.0], [14.2, 226.0], [14.3, 226.0], [14.4, 226.0], [14.5, 226.0], [14.6, 227.0], [14.7, 227.0], [14.8, 227.0], [14.9, 227.0], [15.0, 227.0], [15.1, 228.0], [15.2, 228.0], [15.3, 228.0], [15.4, 228.0], [15.5, 229.0], [15.6, 229.0], [15.7, 229.0], [15.8, 229.0], [15.9, 230.0], [16.0, 230.0], [16.1, 230.0], [16.2, 231.0], [16.3, 231.0], [16.4, 231.0], [16.5, 231.0], [16.6, 231.0], [16.7, 231.0], [16.8, 232.0], [16.9, 232.0], [17.0, 232.0], [17.1, 233.0], [17.2, 233.0], [17.3, 234.0], [17.4, 234.0], [17.5, 236.0], [17.6, 237.0], [17.7, 238.0], [17.8, 238.0], [17.9, 238.0], [18.0, 238.0], [18.1, 239.0], [18.2, 239.0], [18.3, 239.0], [18.4, 239.0], [18.5, 240.0], [18.6, 240.0], [18.7, 240.0], [18.8, 240.0], [18.9, 240.0], [19.0, 240.0], [19.1, 241.0], [19.2, 242.0], [19.3, 242.0], [19.4, 243.0], [19.5, 243.0], [19.6, 243.0], [19.7, 244.0], [19.8, 244.0], [19.9, 245.0], [20.0, 246.0], [20.1, 246.0], [20.2, 246.0], [20.3, 247.0], [20.4, 247.0], [20.5, 247.0], [20.6, 248.0], [20.7, 248.0], [20.8, 248.0], [20.9, 248.0], [21.0, 248.0], [21.1, 248.0], [21.2, 248.0], [21.3, 248.0], [21.4, 248.0], [21.5, 248.0], [21.6, 248.0], [21.7, 248.0], [21.8, 249.0], [21.9, 249.0], [22.0, 249.0], [22.1, 250.0], [22.2, 250.0], [22.3, 250.0], [22.4, 250.0], [22.5, 251.0], [22.6, 251.0], [22.7, 251.0], [22.8, 251.0], [22.9, 251.0], [23.0, 251.0], [23.1, 252.0], [23.2, 252.0], [23.3, 252.0], [23.4, 252.0], [23.5, 253.0], [23.6, 253.0], [23.7, 253.0], [23.8, 253.0], [23.9, 253.0], [24.0, 253.0], [24.1, 253.0], [24.2, 253.0], [24.3, 253.0], [24.4, 253.0], [24.5, 253.0], [24.6, 254.0], [24.7, 254.0], [24.8, 254.0], [24.9, 254.0], [25.0, 254.0], [25.1, 254.0], [25.2, 254.0], [25.3, 254.0], [25.4, 254.0], [25.5, 254.0], [25.6, 254.0], [25.7, 254.0], [25.8, 254.0], [25.9, 255.0], [26.0, 255.0], [26.1, 255.0], [26.2, 255.0], [26.3, 255.0], [26.4, 255.0], [26.5, 255.0], [26.6, 255.0], [26.7, 255.0], [26.8, 255.0], [26.9, 255.0], [27.0, 255.0], [27.1, 255.0], [27.2, 255.0], [27.3, 255.0], [27.4, 255.0], [27.5, 256.0], [27.6, 256.0], [27.7, 256.0], [27.8, 256.0], [27.9, 256.0], [28.0, 256.0], [28.1, 256.0], [28.2, 256.0], [28.3, 256.0], [28.4, 256.0], [28.5, 256.0], [28.6, 256.0], [28.7, 257.0], [28.8, 257.0], [28.9, 257.0], [29.0, 257.0], [29.1, 258.0], [29.2, 258.0], [29.3, 258.0], [29.4, 258.0], [29.5, 258.0], [29.6, 258.0], [29.7, 258.0], [29.8, 258.0], [29.9, 258.0], [30.0, 258.0], [30.1, 258.0], [30.2, 258.0], [30.3, 258.0], [30.4, 259.0], [30.5, 259.0], [30.6, 259.0], [30.7, 259.0], [30.8, 259.0], [30.9, 259.0], [31.0, 259.0], [31.1, 259.0], [31.2, 259.0], [31.3, 259.0], [31.4, 259.0], [31.5, 259.0], [31.6, 259.0], [31.7, 260.0], [31.8, 260.0], [31.9, 260.0], [32.0, 260.0], [32.1, 260.0], [32.2, 260.0], [32.3, 260.0], [32.4, 260.0], [32.5, 260.0], [32.6, 260.0], [32.7, 260.0], [32.8, 260.0], [32.9, 261.0], [33.0, 261.0], [33.1, 261.0], [33.2, 261.0], [33.3, 261.0], [33.4, 261.0], [33.5, 261.0], [33.6, 261.0], [33.7, 261.0], [33.8, 261.0], [33.9, 261.0], [34.0, 261.0], [34.1, 262.0], [34.2, 262.0], [34.3, 262.0], [34.4, 262.0], [34.5, 262.0], [34.6, 262.0], [34.7, 262.0], [34.8, 262.0], [34.9, 262.0], [35.0, 262.0], [35.1, 262.0], [35.2, 262.0], [35.3, 262.0], [35.4, 263.0], [35.5, 263.0], [35.6, 263.0], [35.7, 263.0], [35.8, 263.0], [35.9, 263.0], [36.0, 263.0], [36.1, 263.0], [36.2, 263.0], [36.3, 263.0], [36.4, 263.0], [36.5, 263.0], [36.6, 263.0], [36.7, 264.0], [36.8, 264.0], [36.9, 264.0], [37.0, 264.0], [37.1, 264.0], [37.2, 264.0], [37.3, 264.0], [37.4, 264.0], [37.5, 264.0], [37.6, 264.0], [37.7, 264.0], [37.8, 264.0], [37.9, 264.0], [38.0, 264.0], [38.1, 265.0], [38.2, 265.0], [38.3, 265.0], [38.4, 265.0], [38.5, 265.0], [38.6, 265.0], [38.7, 265.0], [38.8, 265.0], [38.9, 265.0], [39.0, 266.0], [39.1, 266.0], [39.2, 266.0], [39.3, 266.0], [39.4, 266.0], [39.5, 266.0], [39.6, 266.0], [39.7, 266.0], [39.8, 266.0], [39.9, 267.0], [40.0, 267.0], [40.1, 267.0], [40.2, 267.0], [40.3, 267.0], [40.4, 267.0], [40.5, 267.0], [40.6, 267.0], [40.7, 267.0], [40.8, 267.0], [40.9, 267.0], [41.0, 267.0], [41.1, 267.0], [41.2, 267.0], [41.3, 267.0], [41.4, 268.0], [41.5, 268.0], [41.6, 268.0], [41.7, 268.0], [41.8, 268.0], [41.9, 268.0], [42.0, 268.0], [42.1, 268.0], [42.2, 268.0], [42.3, 268.0], [42.4, 268.0], [42.5, 268.0], [42.6, 268.0], [42.7, 268.0], [42.8, 268.0], [42.9, 268.0], [43.0, 268.0], [43.1, 268.0], [43.2, 268.0], [43.3, 268.0], [43.4, 268.0], [43.5, 268.0], [43.6, 268.0], [43.7, 268.0], [43.8, 268.0], [43.9, 268.0], [44.0, 268.0], [44.1, 269.0], [44.2, 269.0], [44.3, 269.0], [44.4, 269.0], [44.5, 269.0], [44.6, 269.0], [44.7, 269.0], [44.8, 269.0], [44.9, 269.0], [45.0, 269.0], [45.1, 270.0], [45.2, 270.0], [45.3, 270.0], [45.4, 270.0], [45.5, 270.0], [45.6, 270.0], [45.7, 270.0], [45.8, 270.0], [45.9, 270.0], [46.0, 270.0], [46.1, 270.0], [46.2, 270.0], [46.3, 270.0], [46.4, 270.0], [46.5, 271.0], [46.6, 271.0], [46.7, 271.0], [46.8, 271.0], [46.9, 271.0], [47.0, 271.0], [47.1, 271.0], [47.2, 271.0], [47.3, 271.0], [47.4, 271.0], [47.5, 271.0], [47.6, 271.0], [47.7, 271.0], [47.8, 272.0], [47.9, 272.0], [48.0, 272.0], [48.1, 272.0], [48.2, 272.0], [48.3, 272.0], [48.4, 272.0], [48.5, 272.0], [48.6, 272.0], [48.7, 272.0], [48.8, 272.0], [48.9, 272.0], [49.0, 272.0], [49.1, 273.0], [49.2, 273.0], [49.3, 273.0], [49.4, 273.0], [49.5, 273.0], [49.6, 273.0], [49.7, 273.0], [49.8, 273.0], [49.9, 273.0], [50.0, 273.0], [50.1, 273.0], [50.2, 273.0], [50.3, 273.0], [50.4, 273.0], [50.5, 273.0], [50.6, 273.0], [50.7, 273.0], [50.8, 274.0], [50.9, 274.0], [51.0, 274.0], [51.1, 274.0], [51.2, 274.0], [51.3, 274.0], [51.4, 274.0], [51.5, 274.0], [51.6, 274.0], [51.7, 274.0], [51.8, 274.0], [51.9, 274.0], [52.0, 274.0], [52.1, 274.0], [52.2, 274.0], [52.3, 274.0], [52.4, 274.0], [52.5, 274.0], [52.6, 274.0], [52.7, 274.0], [52.8, 275.0], [52.9, 275.0], [53.0, 275.0], [53.1, 275.0], [53.2, 275.0], [53.3, 275.0], [53.4, 275.0], [53.5, 275.0], [53.6, 275.0], [53.7, 275.0], [53.8, 275.0], [53.9, 276.0], [54.0, 276.0], [54.1, 276.0], [54.2, 276.0], [54.3, 276.0], [54.4, 276.0], [54.5, 276.0], [54.6, 276.0], [54.7, 276.0], [54.8, 276.0], [54.9, 276.0], [55.0, 276.0], [55.1, 277.0], [55.2, 277.0], [55.3, 277.0], [55.4, 277.0], [55.5, 277.0], [55.6, 277.0], [55.7, 277.0], [55.8, 278.0], [55.9, 278.0], [56.0, 278.0], [56.1, 278.0], [56.2, 278.0], [56.3, 278.0], [56.4, 278.0], [56.5, 278.0], [56.6, 278.0], [56.7, 278.0], [56.8, 278.0], [56.9, 278.0], [57.0, 278.0], [57.1, 278.0], [57.2, 278.0], [57.3, 278.0], [57.4, 279.0], [57.5, 279.0], [57.6, 279.0], [57.7, 279.0], [57.8, 279.0], [57.9, 279.0], [58.0, 279.0], [58.1, 279.0], [58.2, 279.0], [58.3, 279.0], [58.4, 279.0], [58.5, 279.0], [58.6, 279.0], [58.7, 279.0], [58.8, 279.0], [58.9, 280.0], [59.0, 280.0], [59.1, 280.0], [59.2, 280.0], [59.3, 280.0], [59.4, 280.0], [59.5, 281.0], [59.6, 281.0], [59.7, 281.0], [59.8, 281.0], [59.9, 281.0], [60.0, 281.0], [60.1, 281.0], [60.2, 281.0], [60.3, 282.0], [60.4, 282.0], [60.5, 282.0], [60.6, 284.0], [60.7, 284.0], [60.8, 284.0], [60.9, 285.0], [61.0, 286.0], [61.1, 286.0], [61.2, 292.0], [61.3, 293.0], [61.4, 294.0], [61.5, 295.0], [61.6, 295.0], [61.7, 295.0], [61.8, 296.0], [61.9, 297.0], [62.0, 297.0], [62.1, 298.0], [62.2, 298.0], [62.3, 298.0], [62.4, 298.0], [62.5, 299.0], [62.6, 299.0], [62.7, 300.0], [62.8, 300.0], [62.9, 300.0], [63.0, 301.0], [63.1, 301.0], [63.2, 301.0], [63.3, 301.0], [63.4, 301.0], [63.5, 301.0], [63.6, 302.0], [63.7, 302.0], [63.8, 303.0], [63.9, 303.0], [64.0, 303.0], [64.1, 303.0], [64.2, 303.0], [64.3, 304.0], [64.4, 304.0], [64.5, 304.0], [64.6, 304.0], [64.7, 304.0], [64.8, 304.0], [64.9, 305.0], [65.0, 305.0], [65.1, 305.0], [65.2, 305.0], [65.3, 306.0], [65.4, 306.0], [65.5, 306.0], [65.6, 306.0], [65.7, 307.0], [65.8, 307.0], [65.9, 307.0], [66.0, 307.0], [66.1, 308.0], [66.2, 308.0], [66.3, 308.0], [66.4, 308.0], [66.5, 308.0], [66.6, 309.0], [66.7, 309.0], [66.8, 309.0], [66.9, 309.0], [67.0, 309.0], [67.1, 309.0], [67.2, 309.0], [67.3, 309.0], [67.4, 310.0], [67.5, 310.0], [67.6, 310.0], [67.7, 310.0], [67.8, 310.0], [67.9, 310.0], [68.0, 310.0], [68.1, 310.0], [68.2, 310.0], [68.3, 310.0], [68.4, 310.0], [68.5, 310.0], [68.6, 311.0], [68.7, 311.0], [68.8, 311.0], [68.9, 311.0], [69.0, 311.0], [69.1, 311.0], [69.2, 311.0], [69.3, 311.0], [69.4, 311.0], [69.5, 311.0], [69.6, 311.0], [69.7, 311.0], [69.8, 311.0], [69.9, 311.0], [70.0, 311.0], [70.1, 311.0], [70.2, 311.0], [70.3, 311.0], [70.4, 311.0], [70.5, 312.0], [70.6, 312.0], [70.7, 312.0], [70.8, 312.0], [70.9, 312.0], [71.0, 312.0], [71.1, 312.0], [71.2, 312.0], [71.3, 312.0], [71.4, 312.0], [71.5, 312.0], [71.6, 312.0], [71.7, 312.0], [71.8, 312.0], [71.9, 312.0], [72.0, 313.0], [72.1, 313.0], [72.2, 313.0], [72.3, 313.0], [72.4, 313.0], [72.5, 313.0], [72.6, 314.0], [72.7, 314.0], [72.8, 314.0], [72.9, 314.0], [73.0, 314.0], [73.1, 315.0], [73.2, 315.0], [73.3, 315.0], [73.4, 315.0], [73.5, 315.0], [73.6, 316.0], [73.7, 316.0], [73.8, 316.0], [73.9, 316.0], [74.0, 316.0], [74.1, 317.0], [74.2, 317.0], [74.3, 317.0], [74.4, 317.0], [74.5, 317.0], [74.6, 317.0], [74.7, 317.0], [74.8, 318.0], [74.9, 318.0], [75.0, 318.0], [75.1, 318.0], [75.2, 318.0], [75.3, 318.0], [75.4, 318.0], [75.5, 318.0], [75.6, 318.0], [75.7, 319.0], [75.8, 319.0], [75.9, 319.0], [76.0, 320.0], [76.1, 320.0], [76.2, 320.0], [76.3, 320.0], [76.4, 320.0], [76.5, 320.0], [76.6, 320.0], [76.7, 320.0], [76.8, 320.0], [76.9, 321.0], [77.0, 321.0], [77.1, 321.0], [77.2, 321.0], [77.3, 321.0], [77.4, 321.0], [77.5, 322.0], [77.6, 322.0], [77.7, 322.0], [77.8, 322.0], [77.9, 322.0], [78.0, 322.0], [78.1, 322.0], [78.2, 322.0], [78.3, 322.0], [78.4, 323.0], [78.5, 323.0], [78.6, 323.0], [78.7, 323.0], [78.8, 323.0], [78.9, 323.0], [79.0, 323.0], [79.1, 323.0], [79.2, 323.0], [79.3, 324.0], [79.4, 324.0], [79.5, 324.0], [79.6, 324.0], [79.7, 324.0], [79.8, 324.0], [79.9, 325.0], [80.0, 325.0], [80.1, 326.0], [80.2, 326.0], [80.3, 327.0], [80.4, 327.0], [80.5, 327.0], [80.6, 327.0], [80.7, 327.0], [80.8, 327.0], [80.9, 327.0], [81.0, 327.0], [81.1, 327.0], [81.2, 327.0], [81.3, 327.0], [81.4, 327.0], [81.5, 328.0], [81.6, 328.0], [81.7, 328.0], [81.8, 328.0], [81.9, 328.0], [82.0, 328.0], [82.1, 329.0], [82.2, 329.0], [82.3, 329.0], [82.4, 329.0], [82.5, 329.0], [82.6, 329.0], [82.7, 329.0], [82.8, 329.0], [82.9, 329.0], [83.0, 329.0], [83.1, 330.0], [83.2, 330.0], [83.3, 330.0], [83.4, 331.0], [83.5, 331.0], [83.6, 331.0], [83.7, 331.0], [83.8, 331.0], [83.9, 332.0], [84.0, 332.0], [84.1, 332.0], [84.2, 332.0], [84.3, 332.0], [84.4, 332.0], [84.5, 332.0], [84.6, 332.0], [84.7, 332.0], [84.8, 332.0], [84.9, 332.0], [85.0, 333.0], [85.1, 333.0], [85.2, 333.0], [85.3, 334.0], [85.4, 334.0], [85.5, 334.0], [85.6, 334.0], [85.7, 335.0], [85.8, 335.0], [85.9, 335.0], [86.0, 336.0], [86.1, 336.0], [86.2, 336.0], [86.3, 337.0], [86.4, 337.0], [86.5, 337.0], [86.6, 338.0], [86.7, 338.0], [86.8, 338.0], [86.9, 338.0], [87.0, 338.0], [87.1, 338.0], [87.2, 339.0], [87.3, 339.0], [87.4, 339.0], [87.5, 340.0], [87.6, 340.0], [87.7, 340.0], [87.8, 341.0], [87.9, 341.0], [88.0, 341.0], [88.1, 341.0], [88.2, 341.0], [88.3, 342.0], [88.4, 342.0], [88.5, 342.0], [88.6, 342.0], [88.7, 342.0], [88.8, 342.0], [88.9, 342.0], [89.0, 342.0], [89.1, 342.0], [89.2, 343.0], [89.3, 343.0], [89.4, 343.0], [89.5, 343.0], [89.6, 343.0], [89.7, 343.0], [89.8, 343.0], [89.9, 343.0], [90.0, 343.0], [90.1, 343.0], [90.2, 344.0], [90.3, 345.0], [90.4, 345.0], [90.5, 346.0], [90.6, 346.0], [90.7, 347.0], [90.8, 347.0], [90.9, 348.0], [91.0, 348.0], [91.1, 349.0], [91.2, 349.0], [91.3, 349.0], [91.4, 349.0], [91.5, 349.0], [91.6, 349.0], [91.7, 349.0], [91.8, 349.0], [91.9, 350.0], [92.0, 350.0], [92.1, 351.0], [92.2, 351.0], [92.3, 352.0], [92.4, 352.0], [92.5, 352.0], [92.6, 353.0], [92.7, 353.0], [92.8, 353.0], [92.9, 353.0], [93.0, 353.0], [93.1, 354.0], [93.2, 354.0], [93.3, 354.0], [93.4, 355.0], [93.5, 355.0], [93.6, 355.0], [93.7, 355.0], [93.8, 355.0], [93.9, 357.0], [94.0, 357.0], [94.1, 357.0], [94.2, 360.0], [94.3, 361.0], [94.4, 361.0], [94.5, 361.0], [94.6, 362.0], [94.7, 362.0], [94.8, 362.0], [94.9, 362.0], [95.0, 362.0], [95.1, 363.0], [95.2, 367.0], [95.3, 370.0], [95.4, 476.0], [95.5, 507.0], [95.6, 536.0], [95.7, 539.0], [95.8, 539.0], [95.9, 582.0], [96.0, 593.0], [96.1, 596.0], [96.2, 598.0], [96.3, 601.0], [96.4, 604.0], [96.5, 609.0], [96.6, 613.0], [96.7, 618.0], [96.8, 622.0], [96.9, 624.0], [97.0, 625.0], [97.1, 654.0], [97.2, 665.0], [97.3, 854.0], [97.4, 856.0], [97.5, 859.0], [97.6, 862.0], [97.7, 864.0], [97.8, 867.0], [97.9, 875.0], [98.0, 879.0], [98.1, 885.0], [98.2, 885.0], [98.3, 888.0], [98.4, 894.0], [98.5, 897.0], [98.6, 900.0], [98.7, 901.0], [98.8, 902.0], [98.9, 905.0], [99.0, 912.0], [99.1, 913.0], [99.2, 913.0], [99.3, 913.0], [99.4, 917.0], [99.5, 922.0], [99.6, 924.0], [99.7, 926.0], [99.8, 929.0], [99.9, 935.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 523.0, "series": [{"data": [[0.0, 55.0], [300.0, 327.0], [600.0, 10.0], [100.0, 49.0], [200.0, 523.0], [400.0, 1.0], [800.0, 13.0], [900.0, 14.0], [500.0, 8.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 900.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 45.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 955.0, "series": [{"data": [[0.0, 955.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 45.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 89.55900000000001, "minX": 1.66802136E12, "maxY": 89.55900000000001, "series": [{"data": [[1.66802136E12, 89.55900000000001]], "isOverall": false, "label": "Thread Group (Node)", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66802136E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 4.0, "minX": 1.0, "maxY": 312.9714285714285, "series": [{"data": [[2.0, 31.88888888888889], [3.0, 77.0], [4.0, 70.0], [5.0, 70.0], [6.0, 71.0], [7.0, 71.0], [8.0, 72.0], [9.0, 71.0], [10.0, 70.0], [12.0, 73.0], [13.0, 70.0], [14.0, 69.0], [15.0, 70.0], [16.0, 70.0], [17.0, 69.0], [18.0, 69.0], [19.0, 69.0], [20.0, 70.0], [21.0, 76.0], [22.0, 77.0], [23.0, 77.0], [24.0, 78.0], [25.0, 78.0], [26.0, 72.0], [27.0, 72.0], [28.0, 110.32142857142854], [29.0, 106.0], [30.0, 107.0], [31.0, 106.0], [33.0, 106.0], [32.0, 106.0], [35.0, 107.0], [34.0, 107.0], [37.0, 107.0], [36.0, 107.0], [39.0, 254.0], [38.0, 260.89473684210515], [41.0, 254.0], [40.0, 254.0], [43.0, 260.0], [42.0, 260.0], [45.0, 259.0], [44.0, 261.0], [47.0, 259.0], [46.0, 259.0], [49.0, 251.0], [48.0, 258.0], [51.0, 251.0], [50.0, 251.0], [53.0, 253.0], [52.0, 251.0], [55.0, 253.0], [54.0, 253.0], [57.0, 251.0], [56.0, 252.0], [59.0, 254.0], [58.0, 252.0], [61.0, 257.0], [60.0, 256.0], [63.0, 260.0], [62.0, 259.0], [67.0, 268.0], [66.0, 268.0], [65.0, 267.0], [64.0, 268.0], [71.0, 264.0], [70.0, 269.0], [69.0, 269.0], [68.0, 268.0], [75.0, 263.0], [74.0, 264.0], [73.0, 264.0], [72.0, 265.0], [79.0, 266.0], [78.0, 265.0], [77.0, 264.0], [76.0, 264.0], [83.0, 265.0], [82.0, 266.0], [81.0, 265.0], [80.0, 265.0], [87.0, 272.0], [86.0, 273.0], [85.0, 266.0], [84.0, 265.0], [91.0, 273.0], [90.0, 273.0], [89.0, 272.0], [88.0, 272.0], [95.0, 269.6631578947368], [94.0, 265.0], [93.0, 266.0], [92.0, 267.0], [99.0, 262.0], [98.0, 263.0], [97.0, 263.0], [96.0, 262.0], [100.0, 312.9714285714285], [1.0, 4.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[89.55900000000001, 287.42199999999957]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 3432.0, "minX": 1.66802136E12, "maxY": 3766.6666666666665, "series": [{"data": [[1.66802136E12, 3766.6666666666665]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66802136E12, 3432.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66802136E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 287.42199999999957, "minX": 1.66802136E12, "maxY": 287.42199999999957, "series": [{"data": [[1.66802136E12, 287.42199999999957]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66802136E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 287.4050000000007, "minX": 1.66802136E12, "maxY": 287.4050000000007, "series": [{"data": [[1.66802136E12, 287.4050000000007]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66802136E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 4.705999999999995, "minX": 1.66802136E12, "maxY": 4.705999999999995, "series": [{"data": [[1.66802136E12, 4.705999999999995]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66802136E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 4.0, "minX": 1.66802136E12, "maxY": 935.0, "series": [{"data": [[1.66802136E12, 935.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66802136E12, 343.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66802136E12, 911.9300000000001]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66802136E12, 362.94999999999993]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66802136E12, 4.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66802136E12, 273.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66802136E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 39.0, "minX": 13.0, "maxY": 321.0, "series": [{"data": [[277.0, 250.0], [325.0, 321.0], [20.0, 70.0], [365.0, 264.0], [13.0, 39.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 365.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 39.0, "minX": 13.0, "maxY": 321.0, "series": [{"data": [[277.0, 250.0], [325.0, 321.0], [20.0, 70.0], [365.0, 264.0], [13.0, 39.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 365.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 16.666666666666668, "minX": 1.66802136E12, "maxY": 16.666666666666668, "series": [{"data": [[1.66802136E12, 16.666666666666668]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66802136E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 16.666666666666668, "minX": 1.66802136E12, "maxY": 16.666666666666668, "series": [{"data": [[1.66802136E12, 16.666666666666668]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66802136E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 16.666666666666668, "minX": 1.66802136E12, "maxY": 16.666666666666668, "series": [{"data": [[1.66802136E12, 16.666666666666668]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66802136E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 16.666666666666668, "minX": 1.66802136E12, "maxY": 16.666666666666668, "series": [{"data": [[1.66802136E12, 16.666666666666668]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66802136E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

