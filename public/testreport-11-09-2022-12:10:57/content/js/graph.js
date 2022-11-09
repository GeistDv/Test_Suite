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
        data: {"result": {"minY": 2.0, "minX": 0.0, "maxY": 960.0, "series": [{"data": [[0.0, 2.0], [0.1, 3.0], [0.2, 3.0], [0.3, 3.0], [0.4, 5.0], [0.5, 10.0], [0.6, 11.0], [0.7, 40.0], [0.8, 41.0], [0.9, 54.0], [1.0, 59.0], [1.1, 65.0], [1.2, 65.0], [1.3, 67.0], [1.4, 67.0], [1.5, 67.0], [1.6, 71.0], [1.7, 72.0], [1.8, 72.0], [1.9, 73.0], [2.0, 73.0], [2.1, 73.0], [2.2, 73.0], [2.3, 73.0], [2.4, 73.0], [2.5, 74.0], [2.6, 75.0], [2.7, 75.0], [2.8, 75.0], [2.9, 77.0], [3.0, 77.0], [3.1, 77.0], [3.2, 77.0], [3.3, 78.0], [3.4, 78.0], [3.5, 78.0], [3.6, 78.0], [3.7, 79.0], [3.8, 79.0], [3.9, 80.0], [4.0, 80.0], [4.1, 82.0], [4.2, 83.0], [4.3, 84.0], [4.4, 85.0], [4.5, 86.0], [4.6, 86.0], [4.7, 88.0], [4.8, 88.0], [4.9, 89.0], [5.0, 90.0], [5.1, 91.0], [5.2, 91.0], [5.3, 91.0], [5.4, 91.0], [5.5, 92.0], [5.6, 92.0], [5.7, 93.0], [5.8, 93.0], [5.9, 94.0], [6.0, 95.0], [6.1, 95.0], [6.2, 95.0], [6.3, 96.0], [6.4, 96.0], [6.5, 97.0], [6.6, 98.0], [6.7, 99.0], [6.8, 99.0], [6.9, 100.0], [7.0, 100.0], [7.1, 101.0], [7.2, 101.0], [7.3, 102.0], [7.4, 103.0], [7.5, 103.0], [7.6, 103.0], [7.7, 109.0], [7.8, 113.0], [7.9, 115.0], [8.0, 118.0], [8.1, 126.0], [8.2, 129.0], [8.3, 130.0], [8.4, 132.0], [8.5, 134.0], [8.6, 138.0], [8.7, 140.0], [8.8, 141.0], [8.9, 143.0], [9.0, 147.0], [9.1, 150.0], [9.2, 153.0], [9.3, 158.0], [9.4, 160.0], [9.5, 161.0], [9.6, 164.0], [9.7, 169.0], [9.8, 171.0], [9.9, 181.0], [10.0, 182.0], [10.1, 185.0], [10.2, 186.0], [10.3, 190.0], [10.4, 192.0], [10.5, 192.0], [10.6, 195.0], [10.7, 197.0], [10.8, 200.0], [10.9, 201.0], [11.0, 205.0], [11.1, 210.0], [11.2, 213.0], [11.3, 214.0], [11.4, 218.0], [11.5, 223.0], [11.6, 225.0], [11.7, 228.0], [11.8, 233.0], [11.9, 236.0], [12.0, 239.0], [12.1, 239.0], [12.2, 245.0], [12.3, 246.0], [12.4, 246.0], [12.5, 246.0], [12.6, 246.0], [12.7, 247.0], [12.8, 247.0], [12.9, 247.0], [13.0, 247.0], [13.1, 247.0], [13.2, 247.0], [13.3, 247.0], [13.4, 248.0], [13.5, 248.0], [13.6, 248.0], [13.7, 249.0], [13.8, 249.0], [13.9, 250.0], [14.0, 251.0], [14.1, 251.0], [14.2, 251.0], [14.3, 251.0], [14.4, 252.0], [14.5, 252.0], [14.6, 252.0], [14.7, 252.0], [14.8, 252.0], [14.9, 253.0], [15.0, 253.0], [15.1, 253.0], [15.2, 253.0], [15.3, 253.0], [15.4, 254.0], [15.5, 254.0], [15.6, 254.0], [15.7, 254.0], [15.8, 254.0], [15.9, 254.0], [16.0, 255.0], [16.1, 255.0], [16.2, 255.0], [16.3, 255.0], [16.4, 255.0], [16.5, 255.0], [16.6, 255.0], [16.7, 255.0], [16.8, 255.0], [16.9, 255.0], [17.0, 255.0], [17.1, 255.0], [17.2, 255.0], [17.3, 256.0], [17.4, 256.0], [17.5, 256.0], [17.6, 256.0], [17.7, 256.0], [17.8, 256.0], [17.9, 256.0], [18.0, 256.0], [18.1, 256.0], [18.2, 256.0], [18.3, 256.0], [18.4, 256.0], [18.5, 256.0], [18.6, 256.0], [18.7, 256.0], [18.8, 257.0], [18.9, 257.0], [19.0, 257.0], [19.1, 257.0], [19.2, 257.0], [19.3, 257.0], [19.4, 257.0], [19.5, 257.0], [19.6, 257.0], [19.7, 257.0], [19.8, 257.0], [19.9, 257.0], [20.0, 257.0], [20.1, 257.0], [20.2, 257.0], [20.3, 257.0], [20.4, 257.0], [20.5, 257.0], [20.6, 257.0], [20.7, 258.0], [20.8, 258.0], [20.9, 258.0], [21.0, 258.0], [21.1, 258.0], [21.2, 258.0], [21.3, 258.0], [21.4, 258.0], [21.5, 258.0], [21.6, 258.0], [21.7, 258.0], [21.8, 258.0], [21.9, 259.0], [22.0, 259.0], [22.1, 259.0], [22.2, 259.0], [22.3, 259.0], [22.4, 259.0], [22.5, 259.0], [22.6, 259.0], [22.7, 259.0], [22.8, 259.0], [22.9, 259.0], [23.0, 259.0], [23.1, 259.0], [23.2, 260.0], [23.3, 260.0], [23.4, 260.0], [23.5, 260.0], [23.6, 260.0], [23.7, 260.0], [23.8, 261.0], [23.9, 261.0], [24.0, 261.0], [24.1, 261.0], [24.2, 261.0], [24.3, 261.0], [24.4, 261.0], [24.5, 261.0], [24.6, 261.0], [24.7, 261.0], [24.8, 261.0], [24.9, 261.0], [25.0, 261.0], [25.1, 261.0], [25.2, 261.0], [25.3, 261.0], [25.4, 261.0], [25.5, 261.0], [25.6, 261.0], [25.7, 261.0], [25.8, 261.0], [25.9, 261.0], [26.0, 261.0], [26.1, 261.0], [26.2, 261.0], [26.3, 262.0], [26.4, 262.0], [26.5, 262.0], [26.6, 262.0], [26.7, 262.0], [26.8, 262.0], [26.9, 262.0], [27.0, 262.0], [27.1, 262.0], [27.2, 262.0], [27.3, 262.0], [27.4, 262.0], [27.5, 262.0], [27.6, 262.0], [27.7, 262.0], [27.8, 262.0], [27.9, 263.0], [28.0, 263.0], [28.1, 263.0], [28.2, 263.0], [28.3, 263.0], [28.4, 263.0], [28.5, 263.0], [28.6, 263.0], [28.7, 263.0], [28.8, 263.0], [28.9, 263.0], [29.0, 263.0], [29.1, 263.0], [29.2, 263.0], [29.3, 263.0], [29.4, 263.0], [29.5, 263.0], [29.6, 263.0], [29.7, 263.0], [29.8, 263.0], [29.9, 263.0], [30.0, 263.0], [30.1, 263.0], [30.2, 263.0], [30.3, 263.0], [30.4, 263.0], [30.5, 263.0], [30.6, 264.0], [30.7, 264.0], [30.8, 264.0], [30.9, 264.0], [31.0, 264.0], [31.1, 264.0], [31.2, 264.0], [31.3, 264.0], [31.4, 265.0], [31.5, 265.0], [31.6, 265.0], [31.7, 265.0], [31.8, 265.0], [31.9, 265.0], [32.0, 265.0], [32.1, 265.0], [32.2, 265.0], [32.3, 265.0], [32.4, 265.0], [32.5, 265.0], [32.6, 265.0], [32.7, 266.0], [32.8, 266.0], [32.9, 266.0], [33.0, 266.0], [33.1, 266.0], [33.2, 266.0], [33.3, 266.0], [33.4, 266.0], [33.5, 266.0], [33.6, 266.0], [33.7, 266.0], [33.8, 266.0], [33.9, 266.0], [34.0, 266.0], [34.1, 266.0], [34.2, 267.0], [34.3, 267.0], [34.4, 267.0], [34.5, 267.0], [34.6, 267.0], [34.7, 267.0], [34.8, 267.0], [34.9, 267.0], [35.0, 267.0], [35.1, 267.0], [35.2, 267.0], [35.3, 267.0], [35.4, 267.0], [35.5, 267.0], [35.6, 268.0], [35.7, 268.0], [35.8, 268.0], [35.9, 268.0], [36.0, 268.0], [36.1, 268.0], [36.2, 268.0], [36.3, 268.0], [36.4, 268.0], [36.5, 268.0], [36.6, 268.0], [36.7, 268.0], [36.8, 268.0], [36.9, 268.0], [37.0, 269.0], [37.1, 269.0], [37.2, 269.0], [37.3, 269.0], [37.4, 269.0], [37.5, 269.0], [37.6, 269.0], [37.7, 269.0], [37.8, 270.0], [37.9, 270.0], [38.0, 271.0], [38.1, 271.0], [38.2, 271.0], [38.3, 272.0], [38.4, 272.0], [38.5, 272.0], [38.6, 272.0], [38.7, 273.0], [38.8, 273.0], [38.9, 273.0], [39.0, 273.0], [39.1, 274.0], [39.2, 274.0], [39.3, 274.0], [39.4, 274.0], [39.5, 274.0], [39.6, 274.0], [39.7, 274.0], [39.8, 274.0], [39.9, 274.0], [40.0, 274.0], [40.1, 274.0], [40.2, 275.0], [40.3, 275.0], [40.4, 275.0], [40.5, 277.0], [40.6, 278.0], [40.7, 278.0], [40.8, 279.0], [40.9, 279.0], [41.0, 279.0], [41.1, 279.0], [41.2, 280.0], [41.3, 280.0], [41.4, 280.0], [41.5, 280.0], [41.6, 280.0], [41.7, 280.0], [41.8, 280.0], [41.9, 281.0], [42.0, 281.0], [42.1, 281.0], [42.2, 281.0], [42.3, 281.0], [42.4, 281.0], [42.5, 281.0], [42.6, 281.0], [42.7, 281.0], [42.8, 281.0], [42.9, 281.0], [43.0, 281.0], [43.1, 281.0], [43.2, 282.0], [43.3, 282.0], [43.4, 282.0], [43.5, 282.0], [43.6, 283.0], [43.7, 283.0], [43.8, 283.0], [43.9, 283.0], [44.0, 283.0], [44.1, 284.0], [44.2, 284.0], [44.3, 284.0], [44.4, 284.0], [44.5, 284.0], [44.6, 284.0], [44.7, 284.0], [44.8, 284.0], [44.9, 284.0], [45.0, 284.0], [45.1, 284.0], [45.2, 285.0], [45.3, 285.0], [45.4, 285.0], [45.5, 285.0], [45.6, 285.0], [45.7, 285.0], [45.8, 285.0], [45.9, 285.0], [46.0, 285.0], [46.1, 285.0], [46.2, 285.0], [46.3, 285.0], [46.4, 286.0], [46.5, 286.0], [46.6, 286.0], [46.7, 286.0], [46.8, 286.0], [46.9, 286.0], [47.0, 286.0], [47.1, 286.0], [47.2, 286.0], [47.3, 286.0], [47.4, 286.0], [47.5, 286.0], [47.6, 286.0], [47.7, 286.0], [47.8, 286.0], [47.9, 286.0], [48.0, 286.0], [48.1, 286.0], [48.2, 286.0], [48.3, 286.0], [48.4, 286.0], [48.5, 286.0], [48.6, 286.0], [48.7, 286.0], [48.8, 286.0], [48.9, 286.0], [49.0, 287.0], [49.1, 287.0], [49.2, 287.0], [49.3, 287.0], [49.4, 287.0], [49.5, 287.0], [49.6, 287.0], [49.7, 287.0], [49.8, 287.0], [49.9, 287.0], [50.0, 287.0], [50.1, 287.0], [50.2, 287.0], [50.3, 287.0], [50.4, 287.0], [50.5, 287.0], [50.6, 287.0], [50.7, 287.0], [50.8, 287.0], [50.9, 287.0], [51.0, 287.0], [51.1, 287.0], [51.2, 287.0], [51.3, 287.0], [51.4, 287.0], [51.5, 287.0], [51.6, 287.0], [51.7, 287.0], [51.8, 287.0], [51.9, 287.0], [52.0, 287.0], [52.1, 287.0], [52.2, 287.0], [52.3, 287.0], [52.4, 287.0], [52.5, 287.0], [52.6, 287.0], [52.7, 287.0], [52.8, 287.0], [52.9, 288.0], [53.0, 288.0], [53.1, 288.0], [53.2, 288.0], [53.3, 288.0], [53.4, 288.0], [53.5, 288.0], [53.6, 288.0], [53.7, 288.0], [53.8, 288.0], [53.9, 289.0], [54.0, 289.0], [54.1, 289.0], [54.2, 289.0], [54.3, 289.0], [54.4, 289.0], [54.5, 289.0], [54.6, 289.0], [54.7, 289.0], [54.8, 290.0], [54.9, 290.0], [55.0, 290.0], [55.1, 290.0], [55.2, 290.0], [55.3, 291.0], [55.4, 291.0], [55.5, 291.0], [55.6, 291.0], [55.7, 291.0], [55.8, 291.0], [55.9, 291.0], [56.0, 292.0], [56.1, 292.0], [56.2, 292.0], [56.3, 292.0], [56.4, 292.0], [56.5, 292.0], [56.6, 292.0], [56.7, 292.0], [56.8, 292.0], [56.9, 292.0], [57.0, 292.0], [57.1, 292.0], [57.2, 292.0], [57.3, 292.0], [57.4, 292.0], [57.5, 292.0], [57.6, 292.0], [57.7, 292.0], [57.8, 292.0], [57.9, 292.0], [58.0, 292.0], [58.1, 293.0], [58.2, 293.0], [58.3, 293.0], [58.4, 293.0], [58.5, 293.0], [58.6, 293.0], [58.7, 293.0], [58.8, 293.0], [58.9, 293.0], [59.0, 293.0], [59.1, 293.0], [59.2, 293.0], [59.3, 293.0], [59.4, 293.0], [59.5, 293.0], [59.6, 293.0], [59.7, 293.0], [59.8, 293.0], [59.9, 293.0], [60.0, 293.0], [60.1, 294.0], [60.2, 294.0], [60.3, 294.0], [60.4, 294.0], [60.5, 294.0], [60.6, 294.0], [60.7, 294.0], [60.8, 294.0], [60.9, 294.0], [61.0, 294.0], [61.1, 294.0], [61.2, 294.0], [61.3, 294.0], [61.4, 294.0], [61.5, 294.0], [61.6, 294.0], [61.7, 295.0], [61.8, 295.0], [61.9, 295.0], [62.0, 295.0], [62.1, 295.0], [62.2, 295.0], [62.3, 295.0], [62.4, 295.0], [62.5, 295.0], [62.6, 295.0], [62.7, 295.0], [62.8, 295.0], [62.9, 296.0], [63.0, 296.0], [63.1, 296.0], [63.2, 296.0], [63.3, 296.0], [63.4, 296.0], [63.5, 296.0], [63.6, 296.0], [63.7, 296.0], [63.8, 297.0], [63.9, 297.0], [64.0, 297.0], [64.1, 297.0], [64.2, 297.0], [64.3, 297.0], [64.4, 297.0], [64.5, 298.0], [64.6, 298.0], [64.7, 298.0], [64.8, 298.0], [64.9, 298.0], [65.0, 298.0], [65.1, 298.0], [65.2, 298.0], [65.3, 299.0], [65.4, 299.0], [65.5, 299.0], [65.6, 299.0], [65.7, 299.0], [65.8, 299.0], [65.9, 299.0], [66.0, 299.0], [66.1, 299.0], [66.2, 299.0], [66.3, 299.0], [66.4, 299.0], [66.5, 300.0], [66.6, 300.0], [66.7, 300.0], [66.8, 300.0], [66.9, 300.0], [67.0, 300.0], [67.1, 300.0], [67.2, 301.0], [67.3, 301.0], [67.4, 302.0], [67.5, 302.0], [67.6, 302.0], [67.7, 302.0], [67.8, 303.0], [67.9, 303.0], [68.0, 304.0], [68.1, 305.0], [68.2, 305.0], [68.3, 305.0], [68.4, 305.0], [68.5, 305.0], [68.6, 305.0], [68.7, 306.0], [68.8, 306.0], [68.9, 306.0], [69.0, 306.0], [69.1, 306.0], [69.2, 306.0], [69.3, 306.0], [69.4, 306.0], [69.5, 306.0], [69.6, 306.0], [69.7, 307.0], [69.8, 307.0], [69.9, 307.0], [70.0, 307.0], [70.1, 307.0], [70.2, 308.0], [70.3, 308.0], [70.4, 308.0], [70.5, 308.0], [70.6, 309.0], [70.7, 309.0], [70.8, 309.0], [70.9, 309.0], [71.0, 309.0], [71.1, 309.0], [71.2, 309.0], [71.3, 309.0], [71.4, 309.0], [71.5, 310.0], [71.6, 310.0], [71.7, 310.0], [71.8, 310.0], [71.9, 311.0], [72.0, 311.0], [72.1, 311.0], [72.2, 311.0], [72.3, 311.0], [72.4, 311.0], [72.5, 311.0], [72.6, 311.0], [72.7, 312.0], [72.8, 312.0], [72.9, 312.0], [73.0, 312.0], [73.1, 312.0], [73.2, 312.0], [73.3, 312.0], [73.4, 313.0], [73.5, 313.0], [73.6, 313.0], [73.7, 313.0], [73.8, 313.0], [73.9, 313.0], [74.0, 313.0], [74.1, 313.0], [74.2, 313.0], [74.3, 313.0], [74.4, 314.0], [74.5, 314.0], [74.6, 314.0], [74.7, 314.0], [74.8, 314.0], [74.9, 314.0], [75.0, 314.0], [75.1, 314.0], [75.2, 314.0], [75.3, 314.0], [75.4, 314.0], [75.5, 315.0], [75.6, 315.0], [75.7, 315.0], [75.8, 315.0], [75.9, 316.0], [76.0, 317.0], [76.1, 317.0], [76.2, 318.0], [76.3, 318.0], [76.4, 318.0], [76.5, 318.0], [76.6, 318.0], [76.7, 319.0], [76.8, 319.0], [76.9, 319.0], [77.0, 319.0], [77.1, 319.0], [77.2, 319.0], [77.3, 319.0], [77.4, 319.0], [77.5, 320.0], [77.6, 320.0], [77.7, 320.0], [77.8, 320.0], [77.9, 320.0], [78.0, 320.0], [78.1, 320.0], [78.2, 320.0], [78.3, 320.0], [78.4, 320.0], [78.5, 320.0], [78.6, 320.0], [78.7, 320.0], [78.8, 320.0], [78.9, 320.0], [79.0, 320.0], [79.1, 320.0], [79.2, 320.0], [79.3, 320.0], [79.4, 320.0], [79.5, 321.0], [79.6, 321.0], [79.7, 321.0], [79.8, 321.0], [79.9, 321.0], [80.0, 321.0], [80.1, 321.0], [80.2, 321.0], [80.3, 321.0], [80.4, 321.0], [80.5, 321.0], [80.6, 321.0], [80.7, 321.0], [80.8, 321.0], [80.9, 322.0], [81.0, 322.0], [81.1, 322.0], [81.2, 322.0], [81.3, 322.0], [81.4, 323.0], [81.5, 323.0], [81.6, 323.0], [81.7, 324.0], [81.8, 324.0], [81.9, 324.0], [82.0, 324.0], [82.1, 324.0], [82.2, 325.0], [82.3, 325.0], [82.4, 325.0], [82.5, 325.0], [82.6, 325.0], [82.7, 326.0], [82.8, 326.0], [82.9, 326.0], [83.0, 326.0], [83.1, 326.0], [83.2, 326.0], [83.3, 326.0], [83.4, 327.0], [83.5, 327.0], [83.6, 327.0], [83.7, 327.0], [83.8, 327.0], [83.9, 327.0], [84.0, 327.0], [84.1, 327.0], [84.2, 327.0], [84.3, 328.0], [84.4, 329.0], [84.5, 329.0], [84.6, 330.0], [84.7, 330.0], [84.8, 330.0], [84.9, 331.0], [85.0, 331.0], [85.1, 331.0], [85.2, 331.0], [85.3, 331.0], [85.4, 332.0], [85.5, 332.0], [85.6, 332.0], [85.7, 332.0], [85.8, 333.0], [85.9, 337.0], [86.0, 338.0], [86.1, 338.0], [86.2, 338.0], [86.3, 338.0], [86.4, 338.0], [86.5, 338.0], [86.6, 338.0], [86.7, 338.0], [86.8, 338.0], [86.9, 339.0], [87.0, 339.0], [87.1, 339.0], [87.2, 339.0], [87.3, 339.0], [87.4, 339.0], [87.5, 339.0], [87.6, 339.0], [87.7, 339.0], [87.8, 339.0], [87.9, 340.0], [88.0, 340.0], [88.1, 340.0], [88.2, 340.0], [88.3, 340.0], [88.4, 340.0], [88.5, 340.0], [88.6, 340.0], [88.7, 340.0], [88.8, 340.0], [88.9, 340.0], [89.0, 340.0], [89.1, 340.0], [89.2, 340.0], [89.3, 340.0], [89.4, 341.0], [89.5, 341.0], [89.6, 341.0], [89.7, 341.0], [89.8, 341.0], [89.9, 341.0], [90.0, 341.0], [90.1, 341.0], [90.2, 341.0], [90.3, 341.0], [90.4, 342.0], [90.5, 342.0], [90.6, 342.0], [90.7, 342.0], [90.8, 342.0], [90.9, 342.0], [91.0, 342.0], [91.1, 343.0], [91.2, 343.0], [91.3, 343.0], [91.4, 343.0], [91.5, 343.0], [91.6, 344.0], [91.7, 344.0], [91.8, 344.0], [91.9, 344.0], [92.0, 344.0], [92.1, 344.0], [92.2, 344.0], [92.3, 345.0], [92.4, 345.0], [92.5, 345.0], [92.6, 345.0], [92.7, 346.0], [92.8, 346.0], [92.9, 346.0], [93.0, 346.0], [93.1, 346.0], [93.2, 346.0], [93.3, 347.0], [93.4, 347.0], [93.5, 347.0], [93.6, 347.0], [93.7, 348.0], [93.8, 348.0], [93.9, 349.0], [94.0, 350.0], [94.1, 351.0], [94.2, 351.0], [94.3, 351.0], [94.4, 352.0], [94.5, 352.0], [94.6, 352.0], [94.7, 354.0], [94.8, 357.0], [94.9, 360.0], [95.0, 364.0], [95.1, 365.0], [95.2, 367.0], [95.3, 369.0], [95.4, 371.0], [95.5, 372.0], [95.6, 376.0], [95.7, 378.0], [95.8, 382.0], [95.9, 384.0], [96.0, 385.0], [96.1, 385.0], [96.2, 386.0], [96.3, 386.0], [96.4, 491.0], [96.5, 524.0], [96.6, 531.0], [96.7, 534.0], [96.8, 571.0], [96.9, 589.0], [97.0, 616.0], [97.1, 654.0], [97.2, 714.0], [97.3, 869.0], [97.4, 878.0], [97.5, 878.0], [97.6, 879.0], [97.7, 879.0], [97.8, 886.0], [97.9, 889.0], [98.0, 896.0], [98.1, 904.0], [98.2, 910.0], [98.3, 910.0], [98.4, 912.0], [98.5, 912.0], [98.6, 917.0], [98.7, 918.0], [98.8, 921.0], [98.9, 924.0], [99.0, 925.0], [99.1, 927.0], [99.2, 932.0], [99.3, 932.0], [99.4, 940.0], [99.5, 940.0], [99.6, 943.0], [99.7, 945.0], [99.8, 956.0], [99.9, 960.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 557.0, "series": [{"data": [[0.0, 69.0], [300.0, 299.0], [600.0, 2.0], [700.0, 1.0], [100.0, 39.0], [200.0, 557.0], [400.0, 1.0], [800.0, 8.0], [900.0, 19.0], [500.0, 5.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 900.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 35.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 965.0, "series": [{"data": [[0.0, 965.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 35.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 90.43000000000008, "minX": 1.6680138E12, "maxY": 90.43000000000008, "series": [{"data": [[1.6680138E12, 90.43000000000008]], "isOverall": false, "label": "Thread Group (Node)", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6680138E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 3.3333333333333335, "minX": 1.0, "maxY": 309.24553039332545, "series": [{"data": [[2.0, 45.833333333333336], [3.0, 73.0], [4.0, 75.0], [5.0, 77.0], [6.0, 78.0], [7.0, 79.0], [8.0, 79.0], [9.0, 82.0], [10.0, 83.0], [11.0, 84.0], [12.0, 85.0], [13.0, 86.0], [14.0, 88.0], [15.0, 89.0], [16.0, 100.0], [17.0, 102.0], [18.0, 103.0], [19.0, 103.0], [20.0, 103.0], [21.0, 98.0], [22.0, 99.0], [23.0, 100.0], [24.0, 101.0], [25.0, 101.0], [26.0, 99.0], [27.0, 97.0], [28.0, 94.25], [29.0, 266.6206896551724], [30.0, 265.0], [31.0, 258.0], [33.0, 258.0], [32.0, 258.0], [35.0, 257.0], [34.0, 257.0], [37.0, 257.0], [36.0, 257.0], [39.0, 256.0], [38.0, 257.0], [41.0, 257.0], [40.0, 256.0], [43.0, 264.0], [42.0, 265.0], [45.0, 263.0], [44.0, 263.0], [47.0, 262.0], [46.0, 263.0], [49.0, 264.0], [48.0, 263.0], [51.0, 263.0], [50.0, 263.0], [53.0, 256.0], [52.0, 262.0], [55.0, 255.0], [54.0, 256.0], [57.0, 256.0], [56.0, 255.0], [59.0, 257.0], [58.0, 256.0], [61.0, 259.0], [60.0, 258.0], [63.0, 257.0], [62.0, 258.0], [67.0, 264.0], [66.0, 263.0], [65.0, 262.0], [64.0, 263.0], [71.0, 267.0], [70.0, 266.0], [69.0, 266.0], [68.0, 265.0], [75.0, 260.0], [74.0, 267.0], [73.0, 267.0], [72.0, 267.0], [79.0, 259.0], [78.0, 259.0], [77.0, 259.0], [76.0, 259.0], [83.0, 257.0], [82.0, 258.0], [81.0, 258.0], [80.0, 258.0], [87.0, 263.0], [86.0, 263.0], [85.0, 258.0], [84.0, 256.0], [91.0, 264.0], [90.0, 264.0], [89.0, 264.0], [88.0, 263.0], [95.0, 263.0], [94.0, 263.0], [93.0, 263.0], [92.0, 264.0], [99.0, 255.0], [98.0, 255.0], [97.0, 256.0], [96.0, 262.0], [100.0, 309.24553039332545], [1.0, 3.3333333333333335]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[90.43000000000008, 290.6080000000004]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 3432.0, "minX": 1.6680138E12, "maxY": 3766.6666666666665, "series": [{"data": [[1.6680138E12, 3766.6666666666665]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.6680138E12, 3432.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6680138E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 290.6080000000004, "minX": 1.6680138E12, "maxY": 290.6080000000004, "series": [{"data": [[1.6680138E12, 290.6080000000004]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6680138E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 290.6020000000001, "minX": 1.6680138E12, "maxY": 290.6020000000001, "series": [{"data": [[1.6680138E12, 290.6020000000001]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6680138E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 3.1120000000000054, "minX": 1.6680138E12, "maxY": 3.1120000000000054, "series": [{"data": [[1.6680138E12, 3.1120000000000054]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6680138E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 2.0, "minX": 1.6680138E12, "maxY": 960.0, "series": [{"data": [[1.6680138E12, 960.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.6680138E12, 341.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.6680138E12, 924.99]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.6680138E12, 363.7999999999997]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.6680138E12, 2.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.6680138E12, 287.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6680138E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 250.5, "minX": 146.0, "maxY": 331.0, "series": [{"data": [[283.0, 331.0], [146.0, 250.5], [347.0, 293.0], [224.0, 259.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 347.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 250.5, "minX": 146.0, "maxY": 331.0, "series": [{"data": [[283.0, 331.0], [146.0, 250.5], [347.0, 293.0], [224.0, 259.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 347.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 16.666666666666668, "minX": 1.6680138E12, "maxY": 16.666666666666668, "series": [{"data": [[1.6680138E12, 16.666666666666668]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6680138E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 16.666666666666668, "minX": 1.6680138E12, "maxY": 16.666666666666668, "series": [{"data": [[1.6680138E12, 16.666666666666668]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6680138E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 16.666666666666668, "minX": 1.6680138E12, "maxY": 16.666666666666668, "series": [{"data": [[1.6680138E12, 16.666666666666668]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6680138E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 16.666666666666668, "minX": 1.6680138E12, "maxY": 16.666666666666668, "series": [{"data": [[1.6680138E12, 16.666666666666668]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6680138E12, "title": "Total Transactions Per Second"}},
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

