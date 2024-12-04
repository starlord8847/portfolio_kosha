const THREATGRADE = {
    HIGH: 'HIGH',
    MID: 'MID',
    LOW: 'LOW',
    NONE: '✓',
    UNKNOWN: '',
}
Object.freeze(THREATGRADE);

//이미지 넣을때 사용
// image: 'https://mblogthumb-phinf.pstatic.net/MjAyMjA5MDNfOTkg/MDAxNjYyMTgzMTgwNDI0.0aTrjSwhxQxyMDdL3xyvrO6CjY0U0W8Dn5TRUJ7uXAwg.-V8UcmVJOrNf1sdPAfnxL718k-GgcBAozA9Zhq3pJhgg.JPEG.dbs_jln/%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_%EB%93%9C%EB%9E%98%EA%B3%A4%EB%B3%BC.jpg?type=w800',
// video: '',

//assets에 있는 비디오 사용
// video: 'assets/chapter_4/scene_4_4/interactive_video.mp4',
// videoType: 'video/mp4',

//유튜브 비디오 링크 사용
// video: 'P5WTOF11EMI',
// videoType: 'youtube',

//countermeasure1 엑셀용
//countermeasure 팝업용

const THREATLIST = [
    { idx: 0, threat: "자재를 정리정돈 하지 않고 작업 중 통로에서 자재에 걸려 넘어질 위험", 
        countermeasure1: "▶ 통로 및 작업장은 자재 등을 정리정돈하여 걸려 넘어질 위험이 없도록 조치",
        countermeasure: ["통로 및 작업장은 자재 등을 정리정돈하여 걸려 넘어질 위험이 없도록 조치"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_2_4',
        hotspot: 'icon_ext_0',
        image: 'assets/poster/poster_0.jpg'
    },
    { idx: 1, threat: "유리 및 창호 자재를 인력으로 반복 운반하여 근골격계질환 발생 위험", 
        countermeasure1: "▶ 작업 전, 중, 후 적절한 스트레칭을 실시하고, 휴식시간을 충분히 부여",
        countermeasure: ["작업 전, 중, 후 적절한 스트레칭을 실시하고, 휴식시간을 충분히 부여"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_2_5',
        hotspot: 'icon_ext_1',
        image: 'assets/poster/poster_1.jpg'
    },
    { idx: 2, threat: "망치 등 수공구를 사용하여 난간 분리작업 시 공구가 튀어 안면에 부딪힐 위험", 
        countermeasure1: "▶ 보안경 등 보호구 착용 철저",
        countermeasure: ["보안경 등 보호구 착용 철저"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_3_1',
        hotspot: 'icon_ext_2',
        image: 'assets/poster/poster_2.jpg'
    },
    { idx: 3, threat: "고층에서 창틀 또는 유리 설치작업 중 자재를 놓쳐 하부 근로자가 맞을 위험", 
        countermeasure1: "▶ 상부에서 창틀, 유리 등의 설치작업 시 하부 근로자 출입 통제 조치 실시",
        countermeasure: ["상부에서 창틀, 유리 등의 설치작업 시 하부 근로자 출입 통제 조치 실시"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_3_1',
        hotspot: 'icon_ext_3',
        image: 'assets/poster/poster_3.jpg'
    },
    { idx: 4, threat: "창호 및 유리 설치작업 시 안전대 등을 미착용한 상태로 작업하다가 추락할 위험", 
        countermeasure1: "▶ 창호 및 유리 설치작업 시 안전대 등 개인보호구 철저한 착용",
        countermeasure: ["창호 및 유리 설치작업 시 안전대 등 개인보호구 철저한 착용"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_3_1',
        hotspot: 'icon_ext_4',
        image: 'assets/poster/poster_4.jpg'
    },
    { idx: 5, threat: "안전대를 플랫타이에 걸고 작업하다 플랫타이가 끊어지며 떨어질 위험", 
        countermeasure1: "▶ 안전대에 연결된 근로자 1인당 약 2.2톤의 무게를 지탱할 수 있는 고정점 및 고정장치(안전대 부착설비)를 사용",
        countermeasure: ["안전대에 연결된 근로자 1인당 약 2.2톤의 무게를 지탱할 수 있는 고정점 및 고정장치(안전대 부착설비)를 사용"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_3_2',
        hotspot: 'icon_ext_5',
        image: 'assets/poster/poster_25.jpg'
    },
    { idx: 6, threat: "창틀 설치 전 벽에 세워둔 발코니 난간이 넘어져 작업자가 부딪힐 위험", 
        countermeasure1: "▶ 작업현장 내 여유공간에 눕혀 보관 또는 전도방지조치 실시",
        countermeasure: ["작업현장 내 여유공간에 눕혀 보관 또는 전도방지조치 실시"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_3_2',
        hotspot: 'icon_ext_6',
        image: 'assets/poster/poster_27.jpg'
    },
    { idx: 7, threat: "수공구 및 자재 등이 떨어질 위험", 
        countermeasure1: `▶ 수공구, 도구 등의 이탈방지 조치 실시 및 볼트 마대 사용하여 결속조치 실시
▶ 상/하 동시 작업 금지 조치`,
        countermeasure: ["수공구, 도구 등의 이탈방지 조치 실시 및 볼트 마대 사용하여 결속조치 실시", "상/하 동시 작업 금지 조치"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_4_2',
        hotspot: 'icon_ext_7',
        image: 'assets/poster/poster_29.jpg'
    },
    { idx: 8, threat: "근로자가 발코니 난간을 넘어 다른 곳으로 이동하다 떨어질 위험", 
        countermeasure1: `▶ 안전보건교육 및 관리감독 철저 수행`,
        countermeasure: ["안전보건교육 및 관리감독 철저 수행"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_4_2',
        hotspot: 'icon_ext_8',
        image: 'assets/poster/poster_26.jpg'
    },
    { idx: 9, threat: "인력으로 창틀 등의 중량물을 혼자서 운반하여 근골격계질환 발생 위험", 
        countermeasure1: `▶ 무거운 자재 운반 시 2인 1조로 작업`,
        countermeasure: ["무거운 자재 운반 시 2인 1조로 작업"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_5_3',
        hotspot: 'icon_ext_9',
        image: 'assets/poster/poster_10.jpg'
    },
    { idx: 10, threat: "장시간 임팩 작업을 하여 손목 등의 통증 위험", 
        countermeasure1: `▶ 장시간 연속 작업 금지 및 교대작업, 충분한 휴식 시간 부여`,
        countermeasure: ["장시간 연속 작업 금지 및 교대작업, 충분한 휴식 시간 부여"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_5_4',
        hotspot: 'icon_ext_10',
        image: 'assets/poster/poster_11.jpg'
    },
    { idx: 11, threat: "임팩 작업 시 발생하는 소음으로 작업자 난청 발생 위험", 
        countermeasure1: `▶ 귀마개 등 개인보호구 착용`,
        countermeasure: ["귀마개 등 개인보호구 착용"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_5_4',
        hotspot: 'icon_ext_11',
        image: 'assets/poster/poster_12.jpg'
    },
    { idx: 12, threat: "사다리를 이용해 창틀 상부 코킹 작업 중 떨어질 위험", 
        countermeasure1: `▶ 창틀 상부 코킹 작업 시에는 말비계 등 연속된 작업발판을 사용하도록 조치`,
        countermeasure: ["창틀 상부 코킹 작업 시에는 말비계 등 연속된 작업발판을 사용하도록 조치"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_5_5',
        hotspot: 'icon_ext_12',
        image: 'assets/poster/poster_33.jpg'
    },
    { idx: 13, threat: "맨손으로 작업 중 코킹이 피부에 닿아 피부가 손상될 위험", 
        countermeasure1: `▶ 코팅장갑, 긴소매 작업복을 착용하여 코킹재가 직접 피부에 닿지 않도록 조치`,
        countermeasure: ["코팅장갑, 긴소매 작업복을 착용하여 코킹재가 직접 피부에 닿지 않도록 조치"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_5_5',
        hotspot: 'icon_ext_13',
        image: 'assets/poster/poster_14.jpg'
    },
    { idx: 14, threat: "외벽쪽 코킹작업을 위하여 신체 일부를 내밀어 작업 중 떨어질 위험", 
        countermeasure1: `▶ 곤돌라, 달비계 등을 사용하고 불가피한 경우 안전한 지지구조의 작업발판 설치 및 안전대 착용 후 작업`,
        countermeasure: ["곤돌라, 달비계 등을 사용하고 불가피한 경우 안전한 지지구조의 작업발판 설치 및 안전대 착용 후 작업"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_5_5',
        hotspot: 'icon_ext_14',
        image: 'assets/poster/poster_25.jpg'
    },
    { idx: 15, threat: "코킹 끝부분 절단 시 날이 부러져 작업자 눈 등에 맞을 위험", 
        countermeasure1: `▶ 절단용 칼날을 수시로 교체하고 보안경 등 개인보호구 착용`,
        countermeasure: ["절단용 칼날을 수시로 교체하고 보안경 등 개인보호구 착용"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_5_5',
        hotspot: 'icon_ext_15',
        image: 'assets/poster/poster_2.jpg'
    },
    { idx: 16, threat: "대형유리를 압축기를 이용하여 근로자 단독으로 작업 중 흡착 기능이 소실되어 유리가 떨어질 위험", 
        countermeasure1: `▶ 대형유리는 설치 시 2인 1조로 작업하고, 압축기는 유리 중량을 견딜 수 있는지 확인`,
        countermeasure: ["대형유리는 설치 시 2인 1조로 작업하고, 압축기는 유리 중량을 견딜 수 있는지 확인"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_6_1',
        hotspot: 'icon_ext_16',
        image: 'assets/poster/poster_31.jpg'
    },
    { idx: 17, threat: "유리를 운반하던 중 주변 근로자와 부딪혀 신체 일부가 끼일 위험", 
        countermeasure1: `▶ 주변 출입 통제 실시
▶ 유리 설치작업 시 작업반경 내 접근 금지조치 확인`,
        countermeasure: ["주변 출입 통제 실시", "유리 설치작업 시 작업반경 내 접근 금지조치 확인"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_6_1',
        hotspot: 'icon_ext_17',
        image: 'assets/poster/poster_32.jpg'
    },
    { idx: 18, threat: "장갑을 착용하지 않아 유리가 미끄러져 낙하할 위험", 
        countermeasure1: `▶ 코팅장갑을 착용하고, 손상된 것은 즉시 교체`,
        countermeasure: ["코팅장갑을 착용하고, 손상된 것은 즉시 교체"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_6_1',
        hotspot: 'icon_ext_18',
        image: 'assets/poster/poster_14.jpg'
    },
    { idx: 19, threat: "현장에서 직접 유리를 가공하는 등의 작업 중 베일 위험", 
        countermeasure1: `▶ 공장에서 완제품을 제작하여 반입하는 공정으로 개선`,
        countermeasure: ["공장에서 완제품을 제작하여 반입하는 공정으로 개선"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_6_1',
        hotspot: 'icon_ext_19',
        image: 'assets/poster/poster_21.jpg'
    },
    { idx: 20, threat: "상부에서 유리를 잡고 있다 놓쳐 하부에서 끼우기 작업을 하는 근로자가 맞을 위험", 
        countermeasure1: `▶ 2인 이상 작업 시 반드시 상호 확인 후 작업 실시
▶ 유리압축기 적정 흡착력 사전 확인 실시`,
        countermeasure: ["2인 이상 작업 시 반드시 상호 확인 후 작업 실시", "유리압축기 적정 흡착력 사전 확인 실시"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_6_1',
        hotspot: 'icon_ext_20',
        image: 'assets/poster/poster_22.jpg'
    },
    { idx: 21, threat: "주변 정리정돈 불량으로 주변 작업자가 걸려 넘어질 위험", 
        countermeasure1: `▶ 작업장 정리정돈 실시`,
        countermeasure: ["작업장 정리정돈 실시"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_7_1',
        hotspot: 'icon_ext_21',
        image: 'assets/poster/poster_34.jpg'
    },
    { idx: 22, threat: "유리를 끼우고 난 후 제대로 고정하지 않아 살펴보던 작업자 쪽으로 떨어져 맞을 위험", 
        countermeasure1: `▶ 작업이 완료되면 여닫는 충격에 흔들리지 않도록 단단히 고정`,
        countermeasure: ["작업이 완료되면 여닫는 충격에 흔들리지 않도록 단단히 고정"],
        grade: THREATGRADE.UNKNOWN,
        scene: 'scene_7_1',
        hotspot: 'icon_ext_22',
        image: 'assets/poster/poster_27.jpg'
    },
];





