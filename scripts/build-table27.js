const fs = require("fs");
const path = require("path");

const rawData = `CAGAYAN,Total,301509,290801,6854,2005,0,1453,368,28,0,0
CAGAYAN,Own or owner-like possession of the house and lot,224838,218516,4661,525,0,939,180,17,0,0
CAGAYAN,Own house rent lot,9669,9199,286,79,0,96,9,0,0,0
CAGAYAN,Own house rent-free lot with consent of owner,47631,46475,953,79,0,111,11,2,0,0
CAGAYAN,Own house rent-free lot without consent of owner,2502,2429,58,9,0,4,2,0,0,0
CAGAYAN,Rent house/room including lot,5913,4068,396,1176,0,169,100,4,0,0
CAGAYAN,Rent-free house and lot with consent of owner,10587,9755,494,134,0,134,66,4,0,0
CAGAYAN,Rent-free house and lot without consent of owner,368,358,6,3,0,0,0,1,0,0
CAGAYAN,Not reported,1,1,0,0,0,0,0,0,0,0
CAGAYAN,Not applicable,0,0,0,0,0,0,0,0,0,0
ABULUG,Total,8164,7983,133,36,0,6,6,0,0,0
ABULUG,Own or owner-like possession of the house and lot,5841,5739,93,1,0,4,4,0,0,0
ABULUG,Own house rent lot,257,255,2,0,0,0,0,0,0,0
ABULUG,Own house rent-free lot with consent of owner,1406,1377,28,1,0,0,0,0,0,0
ABULUG,Own house rent-free lot without consent of owner,31,31,0,0,0,0,0,0,0,0
ABULUG,Rent house/room including lot,108,68,6,30,0,2,2,0,0,0
ABULUG,Rent-free house and lot with consent of owner,478,470,4,4,0,0,0,0,0,0
ABULUG,Rent-free house and lot without consent of owner,43,43,0,0,0,0,0,0,0,0
ABULUG,Not reported,0,0,0,0,0,0,0,0,0,0
ABULUG,Not applicable,0,0,0,0,0,0,0,0,0,0
ALCALA,Total,9991,9820,158,2,0,9,2,0,0,0
ALCALA,Own or owner-like possession of the house and lot,8261,8134,116,2,0,8,1,0,0,0
ALCALA,Own house rent lot,138,136,2,0,0,0,0,0,0,0
ALCALA,Own house rent-free lot with consent of owner,1218,1189,28,0,0,1,0,0,0,0
ALCALA,Own house rent-free lot without consent of owner,71,71,0,0,0,0,0,0,0,0
ALCALA,Rent house/room including lot,47,44,2,0,0,0,1,0,0,0
ALCALA,Rent-free house and lot with consent of owner,231,222,9,0,0,0,0,0,0,0
ALCALA,Rent-free house and lot without consent of owner,25,24,1,0,0,0,0,0,0,0
ALCALA,Not reported,0,0,0,0,0,0,0,0,0,0
ALCALA,Not applicable,0,0,0,0,0,0,0,0,0,0
ALLACAPAN,Total,8389,8289,74,2,0,3,21,0,0,0
ALLACAPAN,Own or owner-like possession of the house and lot,5317,5270,38,0,0,2,7,0,0,0
ALLACAPAN,Own house rent lot,141,136,4,0,0,0,1,0,0,0
ALLACAPAN,Own house rent-free lot with consent of owner,2501,2479,21,0,0,0,1,0,0,0
ALLACAPAN,Own house rent-free lot without consent of owner,71,71,0,0,0,0,0,0,0,0
ALLACAPAN,Rent house/room including lot,96,84,0,1,0,1,10,0,0,0
ALLACAPAN,Rent-free house and lot with consent of owner,260,246,11,1,0,0,2,0,0,0
ALLACAPAN,Rent-free house and lot without consent of owner,3,3,0,0,0,0,0,0,0,0
ALLACAPAN,Not reported,0,0,0,0,0,0,0,0,0,0
ALLACAPAN,Not applicable,0,0,0,0,0,0,0,0,0,0
AMULUNG,Total,11891,11737,127,0,0,19,8,0,0,0
AMULUNG,Own or owner-like possession of the house and lot,7870,7763,90,0,0,11,6,0,0,0
AMULUNG,Own house rent lot,326,323,3,0,0,0,0,0,0,0
AMULUNG,Own house rent-free lot with consent of owner,3195,3162,27,0,0,6,0,0,0,0
AMULUNG,Own house rent-free lot without consent of owner,98,96,2,0,0,0,0,0,0,0
AMULUNG,Rent house/room including lot,27,27,0,0,0,0,0,0,0,0
AMULUNG,Rent-free house and lot with consent of owner,364,356,4,0,0,2,2,0,0,0
AMULUNG,Rent-free house and lot without consent of owner,11,10,1,0,0,0,0,0,0,0
AMULUNG,Not reported,0,0,0,0,0,0,0,0,0,0
AMULUNG,Not applicable,0,0,0,0,0,0,0,0,0,0
APARRI,Total,15781,15016,530,47,0,159,24,5,0,0
APARRI,Own or owner-like possession of the house and lot,8718,8313,295,23,0,75,7,5,0,0
APARRI,Own house rent lot,1709,1563,86,7,0,50,3,0,0,0
APARRI,Own house rent-free lot with consent of owner,4374,4263,96,7,0,8,0,0,0,0
APARRI,Own house rent-free lot without consent of owner,277,272,5,0,0,0,0,0,0,0
APARRI,Rent house/room including lot,298,238,31,9,0,13,7,0,0,0
APARRI,Rent-free house and lot with consent of owner,396,358,17,1,0,13,7,0,0,0
APARRI,Rent-free house and lot without consent of owner,9,9,0,0,0,0,0,0,0,0
APARRI,Not reported,0,0,0,0,0,0,0,0,0,0
APARRI,Not applicable,0,0,0,0,0,0,0,0,0,0
BAGGAO,Total,21486,21130,289,15,0,37,11,4,0,0
BAGGAO,Own or owner-like possession of the house and lot,17116,16865,203,12,0,27,7,2,0,0
BAGGAO,Own house rent lot,430,419,10,0,0,0,1,0,0,0
BAGGAO,Own house rent-free lot with consent of owner,2856,2798,51,1,0,5,0,1,0,0
BAGGAO,Own house rent-free lot without consent of owner,206,202,4,0,0,0,0,0,0,0
BAGGAO,Rent house/room including lot,136,130,2,2,0,1,1,0,0,0
BAGGAO,Rent-free house and lot with consent of owner,722,696,19,0,0,4,2,1,0,0
BAGGAO,Rent-free house and lot without consent of owner,20,20,0,0,0,0,0,0,0,0
BAGGAO,Not reported,0,0,0,0,0,0,0,0,0,0
BAGGAO,Not applicable,0,0,0,0,0,0,0,0,0,0
BALLESTEROS,Total,8765,8613,116,6,0,19,11,0,0,0
BALLESTEROS,Own or owner-like possession of the house and lot,6192,6096,82,0,0,10,4,0,0,0
BALLESTEROS,Own house rent lot,417,410,3,1,0,3,0,0,0,0
BALLESTEROS,Own house rent-free lot with consent of owner,1619,1598,20,0,0,1,0,0,0,0
BALLESTEROS,Own house rent-free lot without consent of owner,57,56,1,0,0,0,0,0,0,0
BALLESTEROS,Rent house/room including lot,101,83,5,5,0,2,6,0,0,0
BALLESTEROS,Rent-free house and lot with consent of owner,350,341,5,0,0,3,1,0,0,0
BALLESTEROS,Rent-free house and lot without consent of owner,28,28,0,0,0,0,0,0,0,0
BALLESTEROS,Not reported,1,1,0,0,0,0,0,0,0,0
BALLESTEROS,Not applicable,0,0,0,0,0,0,0,0,0,0
BUGUEY,Total,7658,7494,118,31,0,14,1,0,0,0
BUGUEY,Own or owner-like possession of the house and lot,5056,4953,78,15,0,10,0,0,0,0
BUGUEY,Own house rent lot,776,758,13,1,0,3,1,0,0,0
BUGUEY,Own house rent-free lot with consent of owner,1511,1479,17,15,0,0,0,0,0,0
BUGUEY,Own house rent-free lot without consent of owner,26,24,2,0,0,0,0,0,0,0
BUGUEY,Rent house/room including lot,27,24,2,0,0,1,0,0,0,0
BUGUEY,Rent-free house and lot with consent of owner,245,239,6,0,0,0,0,0,0,0
BUGUEY,Rent-free house and lot without consent of owner,17,17,0,0,0,0,0,0,0,0
BUGUEY,Not reported,0,0,0,0,0,0,0,0,0,0
BUGUEY,Not applicable,0,0,0,0,0,0,0,0,0,0
CALAYAN,Total,4250,4178,62,0,0,10,0,0,0,0
CALAYAN,Own or owner-like possession of the house and lot,2943,2896,38,0,0,9,0,0,0,0
CALAYAN,Own house rent lot,29,27,2,0,0,0,0,0,0,0
CALAYAN,Own house rent-free lot with consent of owner,995,987,8,0,0,0,0,0,0,0
CALAYAN,Own house rent-free lot without consent of owner,45,45,0,0,0,0,0,0,0,0
CALAYAN,Rent house/room including lot,16,14,2,0,0,0,0,0,0,0
CALAYAN,Rent-free house and lot with consent of owner,222,209,12,0,0,1,0,0,0,0
CALAYAN,Rent-free house and lot without consent of owner,0,0,0,0,0,0,0,0,0,0
CALAYAN,Not reported,0,0,0,0,0,0,0,0,0,0
CALAYAN,Not applicable,0,0,0,0,0,0,0,0,0,0
CAMALANIUGAN,Total,6111,5901,187,3,0,18,2,0,0,0
CAMALANIUGAN,Own or owner-like possession of the house and lot,4956,4805,135,1,0,14,1,0,0,0
CAMALANIUGAN,Own house rent lot,128,123,5,0,0,0,0,0,0,0
CAMALANIUGAN,Own house rent-free lot with consent of owner,648,616,31,0,0,1,0,0,0,0
CAMALANIUGAN,Own house rent-free lot without consent of owner,75,73,2,0,0,0,0,0,0,0
CAMALANIUGAN,Rent house/room including lot,69,61,5,2,0,1,0,0,0,0
CAMALANIUGAN,Rent-free house and lot with consent of owner,203,192,8,0,0,2,1,0,0,0
CAMALANIUGAN,Rent-free house and lot without consent of owner,32,31,1,0,0,0,0,0,0,0
CAMALANIUGAN,Not reported,0,0,0,0,0,0,0,0,0,0
CAMALANIUGAN,Not applicable,0,0,0,0,0,0,0,0,0,0
CLAVERIA,Total,8223,7968,179,23,0,39,12,2,0,0
CLAVERIA,Own or owner-like possession of the house and lot,6119,5955,126,4,0,26,7,1,0,0
CLAVERIA,Own house rent lot,317,311,5,0,0,0,1,0,0,0
CLAVERIA,Own house rent-free lot with consent of owner,1178,1142,28,1,0,7,0,0,0,0
CLAVERIA,Own house rent-free lot without consent of owner,34,32,1,0,0,1,0,0,0,0
CLAVERIA,Rent house/room including lot,186,154,11,18,0,0,2,1,0,0
CLAVERIA,Rent-free house and lot with consent of owner,384,369,8,0,0,5,2,0,0,0
CLAVERIA,Rent-free house and lot without consent of owner,5,5,0,0,0,0,0,0,0,0
CLAVERIA,Not reported,0,0,0,0,0,0,0,0,0,0
CLAVERIA,Not applicable,0,0,0,0,0,0,0,0,0,0
ENRILE,Total,8235,7974,233,9,0,18,1,0,0,0
ENRILE,Own or owner-like possession of the house and lot,6426,6229,185,6,0,5,1,0,0,0
ENRILE,Own house rent lot,79,79,0,0,0,0,0,0,0,0
ENRILE,Own house rent-free lot with consent of owner,1216,1180,27,0,0,9,0,0,0,0
ENRILE,Own house rent-free lot without consent of owner,53,51,2,0,0,0,0,0,0,0
ENRILE,Rent house/room including lot,85,81,1,3,0,0,0,0,0,0
ENRILE,Rent-free house and lot with consent of owner,369,347,18,0,0,4,0,0,0,0
ENRILE,Rent-free house and lot without consent of owner,7,7,0,0,0,0,0,0,0,0
ENRILE,Not reported,0,0,0,0,0,0,0,0,0,0
ENRILE,Not applicable,0,0,0,0,0,0,0,0,0,0
GATTARAN,Total,14210,13744,386,8,0,64,7,1,0,0
GATTARAN,Own or owner-like possession of the house and lot,9096,8827,230,0,0,37,2,0,0,0
GATTARAN,Own house rent lot,858,827,27,0,0,4,0,0,0,0
GATTARAN,Own house rent-free lot with consent of owner,3267,3155,97,0,0,14,0,1,0,0
GATTARAN,Own house rent-free lot without consent of owner,180,174,1,3,0,1,1,0,0,0
GATTARAN,Rent house/room including lot,123,113,3,5,0,2,0,0,0,0
GATTARAN,Rent-free house and lot with consent of owner,670,632,28,0,0,6,4,0,0,0
GATTARAN,Rent-free house and lot without consent of owner,16,16,0,0,0,0,0,0,0,0
GATTARAN,Not reported,0,0,0,0,0,0,0,0,0,0
GATTARAN,Not applicable,0,0,0,0,0,0,0,0,0,0
GONZAGA,Total,9684,9427,210,9,0,24,9,5,0,0
GONZAGA,Own or owner-like possession of the house and lot,7024,6871,130,1,0,16,6,0,0,0
GONZAGA,Own house rent lot,242,235,7,0,0,0,0,0,0,0
GONZAGA,Own house rent-free lot with consent of owner,1765,1717,42,3,0,1,2,0,0,0
GONZAGA,Own house rent-free lot without consent of owner,97,95,2,0,0,0,0,0,0,0
GONZAGA,Rent house/room including lot,88,75,4,1,0,5,0,3,0,0
GONZAGA,Rent-free house and lot with consent of owner,447,413,25,4,0,2,1,2,0,0
GONZAGA,Rent-free house and lot without consent of owner,21,21,0,0,0,0,0,0,0,0
GONZAGA,Not reported,0,0,0,0,0,0,0,0,0,0
GONZAGA,Not applicable,0,0,0,0,0,0,0,0,0,0
IGUIG,Total,7015,6660,300,0,0,53,1,1,0,0
IGUIG,Own or owner-like possession of the house and lot,5758,5524,201,0,0,31,1,1,0,0
IGUIG,Own house rent lot,113,109,3,0,0,1,0,0,0,0
IGUIG,Own house rent-free lot with consent of owner,609,540,54,0,0,15,0,0,0,0
IGUIG,Own house rent-free lot without consent of owner,41,33,6,0,0,2,0,0,0,0
IGUIG,Rent house/room including lot,182,165,15,0,0,2,0,0,0,0
IGUIG,Rent-free house and lot with consent of owner,307,284,21,0,0,2,0,0,0,0
IGUIG,Rent-free house and lot without consent of owner,5,5,0,0,0,0,0,0,0,0
IGUIG,Not reported,0,0,0,0,0,0,0,0,0,0
IGUIG,Not applicable,0,0,0,0,0,0,0,0,0,0
LAL-LO,Total,11612,11370,205,5,0,24,4,4,0,0
LAL-LO,Own or owner-like possession of the house and lot,8560,8383,145,5,0,21,2,4,0,0
LAL-LO,Own house rent lot,343,337,6,0,0,0,0,0,0,0
LAL-LO,Own house rent-free lot with consent of owner,2167,2138,26,0,0,3,0,0,0,0
LAL-LO,Own house rent-free lot without consent of owner,83,83,0,0,0,0,0,0,0,0
LAL-LO,Rent house/room including lot,81,76,4,0,0,0,1,0,0,0
LAL-LO,Rent-free house and lot with consent of owner,373,348,24,0,0,0,1,0,0,0
LAL-LO,Rent-free house and lot without consent of owner,5,5,0,0,0,0,0,0,0,0
LAL-LO,Not reported,0,0,0,0,0,0,0,0,0,0
LAL-LO,Not applicable,0,0,0,0,0,0,0,0,0,0
LASAM,Total,9889,9712,161,0,0,14,2,0,0,0
LASAM,Own or owner-like possession of the house and lot,7294,7188,98,0,0,7,1,0,0,0
LASAM,Own house rent lot,232,223,8,0,0,0,1,0,0,0
LASAM,Own house rent-free lot with consent of owner,1792,1752,37,0,0,3,0,0,0,0
LASAM,Own house rent-free lot without consent of owner,103,103,0,0,0,0,0,0,0,0
LASAM,Rent house/room including lot,58,57,1,0,0,0,0,0,0,0
LASAM,Rent-free house and lot with consent of owner,402,381,17,0,0,4,0,0,0,0
LASAM,Rent-free house and lot without consent of owner,8,8,0,0,0,0,0,0,0,0
LASAM,Not reported,0,0,0,0,0,0,0,0,0,0
LASAM,Not applicable,0,0,0,0,0,0,0,0,0,0
PAMPLONA,Total,5850,5748,82,3,0,9,8,0,0,0
PAMPLONA,Own or owner-like possession of the house and lot,3756,3691,54,0,0,6,5,0,0,0
PAMPLONA,Own house rent lot,209,206,1,0,0,2,0,0,0,0
PAMPLONA,Own house rent-free lot with consent of owner,1657,1631,20,3,0,1,2,0,0,0
PAMPLONA,Own house rent-free lot without consent of owner,21,21,0,0,0,0,0,0,0,0
PAMPLONA,Rent house/room including lot,18,18,0,0,0,0,0,0,0,0
PAMPLONA,Rent-free house and lot with consent of owner,188,180,7,0,0,0,1,0,0,0
PAMPLONA,Rent-free house and lot without consent of owner,1,1,0,0,0,0,0,0,0,0
PAMPLONA,Not reported,0,0,0,0,0,0,0,0,0,0
PAMPLONA,Not applicable,0,0,0,0,0,0,0,0,0,0
PEÑABLANCA,Total,11594,11432,118,1,0,42,0,1,0,0
PEÑABLANCA,Own or owner-like possession of the house and lot,10409,10279,95,0,0,34,0,1,0,0
PEÑABLANCA,Own house rent lot,375,357,10,0,0,8,0,0,0,0
PEÑABLANCA,Own house rent-free lot with consent of owner,402,398,4,0,0,0,0,0,0,0
PEÑABLANCA,Own house rent-free lot without consent of owner,75,74,1,0,0,0,0,0,0,0
PEÑABLANCA,Rent house/room including lot,78,77,0,1,0,0,0,0,0,0
PEÑABLANCA,Rent-free house and lot with consent of owner,235,227,8,0,0,0,0,0,0,0
PEÑABLANCA,Rent-free house and lot without consent of owner,20,20,0,0,0,0,0,0,0,0
PEÑABLANCA,Not reported,0,0,0,0,0,0,0,0,0,0
PEÑABLANCA,Not applicable,0,0,0,0,0,0,0,0,0,0
PIAT,Total,6122,6013,85,5,0,8,11,0,0,0
PIAT,Own or owner-like possession of the house and lot,4497,4420,60,1,0,8,8,0,0,0
PIAT,Own house rent lot,73,72,1,0,0,0,0,0,0,0
PIAT,Own house rent-free lot with consent of owner,1232,1212,16,3,0,0,1,0,0,0
PIAT,Own house rent-free lot without consent of owner,194,187,7,0,0,0,0,0,0,0
PIAT,Rent house/room including lot,37,35,0,1,0,0,1,0,0,0
PIAT,Rent-free house and lot with consent of owner,83,81,1,0,0,0,1,0,0,0
PIAT,Rent-free house and lot without consent of owner,6,6,0,0,0,0,0,0,0,0
PIAT,Not reported,0,0,0,0,0,0,0,0,0,0
PIAT,Not applicable,0,0,0,0,0,0,0,0,0,0
RIZAL,Total,4485,4332,137,0,0,11,5,0,0,0
RIZAL,Own or owner-like possession of the house and lot,3271,3150,107,0,0,11,3,0,0,0
RIZAL,Own house rent lot,48,48,0,0,0,0,0,0,0,0
RIZAL,Own house rent-free lot with consent of owner,938,912,25,0,0,0,1,0,0,0
RIZAL,Own house rent-free lot without consent of owner,59,58,1,0,0,0,0,0,0,0
RIZAL,Rent house/room including lot,9,9,0,0,0,0,0,0,0,0
RIZAL,Rent-free house and lot with consent of owner,156,151,4,0,0,0,1,0,0,0
RIZAL,Rent-free house and lot without consent of owner,4,4,0,0,0,0,0,0,0,0
RIZAL,Not reported,0,0,0,0,0,0,0,0,0,0
RIZAL,Not applicable,0,0,0,0,0,0,0,0,0,0
SANCHEZ-MIRA,Total,6645,6482,129,16,0,9,9,0,0,0
SANCHEZ-MIRA,Own or owner-like possession of the house and lot,5171,5077,81,1,0,7,5,0,0,0
SANCHEZ-MIRA,Own house rent lot,91,88,3,0,0,0,0,0,0,0
SANCHEZ-MIRA,Own house rent-free lot with consent of owner,803,782,17,4,0,0,0,0,0,0
SANCHEZ-MIRA,Own house rent-free lot without consent of owner,23,23,0,0,0,0,0,0,0,0
SANCHEZ-MIRA,Rent house/room including lot,121,112,6,0,0,1,2,0,0,0
SANCHEZ-MIRA,Rent-free house and lot with consent of owner,429,393,22,11,0,1,2,0,0,0
SANCHEZ-MIRA,Rent-free house and lot without consent of owner,7,7,0,0,0,0,0,0,0,0
SANCHEZ-MIRA,Not reported,0,0,0,0,0,0,0,0,0,0
SANCHEZ-MIRA,Not applicable,0,0,0,0,0,0,0,0,0,0
SANTA ANA,Total,8202,7977,179,20,0,13,11,2,0,0
SANTA ANA,Own or owner-like possession of the house and lot,4651,4553,84,0,0,9,3,2,0,0
SANTA ANA,Own house rent lot,129,127,2,0,0,0,0,0,0,0
SANTA ANA,Own house rent-free lot with consent of owner,2641,2577,54,5,0,3,2,0,0,0
SANTA ANA,Own house rent-free lot without consent of owner,210,196,12,1,0,0,1,0,0,0
SANTA ANA,Rent house/room including lot,228,200,12,13,0,0,3,0,0,0
SANTA ANA,Rent-free house and lot with consent of owner,330,311,15,1,0,1,2,0,0,0
SANTA ANA,Rent-free house and lot without consent of owner,13,13,0,0,0,0,0,0,0,0
SANTA ANA,Not reported,0,0,0,0,0,0,0,0,0,0
SANTA ANA,Not applicable,0,0,0,0,0,0,0,0,0,0
SANTA PRAXEDES,Total,1070,1045,25,0,0,0,0,0,0,0
SANTA PRAXEDES,Own or owner-like possession of the house and lot,850,829,21,0,0,0,0,0,0,0
SANTA PRAXEDES,Own house rent lot,10,10,0,0,0,0,0,0,0,0
SANTA PRAXEDES,Own house rent-free lot with consent of owner,142,139,3,0,0,0,0,0,0,0
SANTA PRAXEDES,Own house rent-free lot without consent of owner,1,1,0,0,0,0,0,0,0,0
SANTA PRAXEDES,Rent house/room including lot,6,6,0,0,0,0,0,0,0,0
SANTA PRAXEDES,Rent-free house and lot with consent of owner,59,58,1,0,0,0,0,0,0,0
SANTA PRAXEDES,Rent-free house and lot without consent of owner,2,2,0,0,0,0,0,0,0,0
SANTA PRAXEDES,Not reported,0,0,0,0,0,0,0,0,0,0
SANTA PRAXEDES,Not applicable,0,0,0,0,0,0,0,0,0,0
SANTA TERESITA,Total,4926,4757,140,10,0,16,3,0,0,0
SANTA TERESITA,Own or owner-like possession of the house and lot,3265,3173,79,2,0,9,2,0,0,0
SANTA TERESITA,Own house rent lot,115,111,3,1,0,0,0,0,0,0
SANTA TERESITA,Own house rent-free lot with consent of owner,1223,1178,37,1,0,7,0,0,0,0
SANTA TERESITA,Own house rent-free lot without consent of owner,52,49,3,0,0,0,0,0,0,0
SANTA TERESITA,Rent house/room including lot,41,32,3,6,0,0,0,0,0,0
SANTA TERESITA,Rent-free house and lot with consent of owner,227,211,15,0,0,0,1,0,0,0
SANTA TERESITA,Rent-free house and lot without consent of owner,3,3,0,0,0,0,0,0,0,0
SANTA TERESITA,Not reported,0,0,0,0,0,0,0,0,0,0
SANTA TERESITA,Not applicable,0,0,0,0,0,0,0,0,0,0
SANTO NIÑO (FAIRE),Total,7174,7022,124,3,0,20,5,0,0,0
SANTO NIÑO (FAIRE),Own or owner-like possession of the house and lot,5404,5297,90,3,0,13,1,0,0,0
SANTO NIÑO (FAIRE),Own house rent lot,138,135,2,0,0,1,0,0,0,0
SANTO NIÑO (FAIRE),Own house rent-free lot with consent of owner,1306,1276,24,0,0,5,1,0,0,0
SANTO NIÑO (FAIRE),Own house rent-free lot without consent of owner,68,67,1,0,0,0,0,0,0,0
SANTO NIÑO (FAIRE),Rent house/room including lot,15,15,0,0,0,0,0,0,0,0
SANTO NIÑO (FAIRE),Rent-free house and lot with consent of owner,232,221,7,0,0,1,3,0,0,0
SANTO NIÑO (FAIRE),Rent-free house and lot without consent of owner,11,11,0,0,0,0,0,0,0,0
SANTO NIÑO (FAIRE),Not reported,0,0,0,0,0,0,0,0,0,0
SANTO NIÑO (FAIRE),Not applicable,0,0,0,0,0,0,0,0,0,0
SOLANA,Total,21406,20870,450,8,0,66,12,0,0,0
SOLANA,Own or owner-like possession of the house and lot,17480,17081,339,7,0,43,10,0,0,0
SOLANA,Own house rent lot,675,651,20,0,0,4,0,0,0,0
SOLANA,Own house rent-free lot with consent of owner,2560,2491,57,0,0,12,0,0,0,0
SOLANA,Own house rent-free lot without consent of owner,90,88,2,0,0,0,0,0,0,0
SOLANA,Rent house/room including lot,83,78,3,1,0,0,1,0,0,0
SOLANA,Rent-free house and lot with consent of owner,511,474,29,0,0,7,1,0,0,0
SOLANA,Rent-free house and lot without consent of owner,7,7,0,0,0,0,0,0,0,0
SOLANA,Not reported,0,0,0,0,0,0,0,0,0,0
SOLANA,Not applicable,0,0,0,0,0,0,0,0,0,0
TUAO,Total,14785,14593,160,1,0,22,9,0,0,0
TUAO,Own or owner-like possession of the house and lot,12454,12302,129,0,0,16,7,0,0,0
TUAO,Own house rent lot,239,236,3,0,0,0,0,0,0,0
TUAO,Own house rent-free lot with consent of owner,1627,1612,15,0,0,0,0,0,0,0
TUAO,Own house rent-free lot without consent of owner,34,33,1,0,0,0,0,0,0,0
TUAO,Rent house/room including lot,96,91,2,1,0,2,0,0,0,0
TUAO,Rent-free house and lot with consent of owner,332,316,10,0,0,4,2,0,0,0
TUAO,Rent-free house and lot without consent of owner,3,3,0,0,0,0,0,0,0,0
TUAO,Not reported,0,0,0,0,0,0,0,0,0,0
TUAO,Not applicable,0,0,0,0,0,0,0,0,0,0
TUGUEGARAO CITY (Capital),Total,37896,33514,1757,1742,0,707,173,3,0,0
TUGUEGARAO CITY (Capital),Own or owner-like possession of the house and lot,31083,28853,1239,441,0,470,79,1,0,0
TUGUEGARAO CITY (Capital),Own house rent lot,1032,887,55,69,0,20,1,0,0,0
TUGUEGARAO CITY (Capital),Own house rent-free lot with consent of owner,783,695,43,35,0,9,1,0,0,0
TUGUEGARAO CITY (Capital),Own house rent-free lot without consent of owner,127,120,2,5,0,0,0,0,0,0
TUGUEGARAO CITY (Capital),Rent house/room including lot,3453,1901,276,1077,0,136,63,0,0,0
TUGUEGARAO CITY (Capital),Rent-free house and lot with consent of owner,1382,1029,139,112,0,72,29,1,0,0
TUGUEGARAO CITY (Capital),Rent-free house and lot without consent of owner,36,29,3,3,0,0,0,1,0,0
TUGUEGARAO CITY (Capital),Not reported,0,0,0,0,0,0,0,0,0,0
TUGUEGARAO CITY (Capital),Not applicable,0,0,0,0,0,0,0,0,0,0`;

const lines = rawData.trim().split("\n");
const result = {};

for (const line of lines) {
  const parts = line.split(",");
  const values = parts.slice(-10).map((v) => parseInt(v.trim(), 10));
  const rest = parts.slice(0, -10).join(",");
  const firstComma = rest.indexOf(",");
  const municipality = rest.slice(0, firstComma).trim();
  const tenure = rest.slice(firstComma + 1).trim();

  const record = {
    total_households: values[0],
    building_type: {
      single_house: values[1],
      duplex: values[2],
      apartment_accessoria_rowhouse: values[3],
      condominium_condotel: values[4],
      other_multi_unit_residential: values[5],
      commercial_industrial_agricultural: values[6],
      institutional_living_quarter: values[7],
      other_types_of_building: values[8],
      not_reported: values[9],
    },
  };

  if (!result[municipality]) result[municipality] = {};
  result[municipality][tenure] = record;
}

const output = {
  table_number: 27,
  title:
    "Number of Households by Type of Building, Tenure Status of the Housing Unit/Lot, and City/Municipality: 2020",
  source: "Philippine Statistics Authority, 2020 Census of Population and Housing",
  province: "Cagayan",
  year: 2020,
  note:
    "Excludes households enumerated in relocation areas and enumerated as homeless.",
  data: result,
};

const outPath = path.join(process.cwd(), "data", "cagayan-households-by-building-tenure-2020.json");
fs.writeFileSync(outPath, JSON.stringify(output, null, 2), "utf8");
console.log("Wrote", outPath);
