<!-- <script setup>

</script> -->

<script>
import { ref, onMounted, computed, defineExpose, getCurrentInstance } from 'vue';
export default {
    data() {
        return {
            currentThreatData: {
                image: '/assets/web/zoom_icon.svg', // 이미지 소스 URL
            },
            modalOpen: false,
            selectedImage: null,
            showZoomIcon: false,
        };
    },
    methods: {
        openModal(image) {
            this.selectedImage = image;
            this.modalOpen = true;
            this.$nextTick(() => {
                this.resizeImage();
                window.addEventListener('resize', this.resizeImage);
            });
        },
        closeModal() {
            this.selectedImage = null;
            this.modalOpen = false;
            window.removeEventListener('resize', this.resizeImage);
        },
        resizeImage() {
        // 이미지 크기 조절 로직
        // 이미지가 로드되면 호출됨
        },
        resetModalImage() {
        const modalContent = document.querySelector('.fixed img');
            if (modalContent) {
                modalContent.style.width = 'auto';
                modalContent.style.height = 'auto';
            }
        },
        resetBrowserZoom() {
        document.body.style.zoom = '1'; // 브라우저의 확대 수준을 초기화 (기본값으로 설정)
        }
    },
    setup(props, { expose }) {
        onMounted(()=>{

            embedpano(
                {
                    id:'vr',
                    xml:"tour.xml",
                    target:"pano", 
                    html5:"only", 
                    mobilescale:1.0, 
                    consolelog: false,
                    passQueryParameters:"startscene,startlookat,editor"
                }
            );
            console.log('%c==================================================================================', 'color:red');
            console.log(' /OO       '+'%c  /OOOOOO     /OOOOOO   '+'%c /OO   /OO    /OOOOOO     /OOOOOO     /OOOOOO', 'color: blue', 'color:black');
            console.log('| OO       '+'%c /OO__  OO   /OO__  OO  '+'%c| OO  | OO   |____  OO   /OO____/    /OO__  OO', 'color: blue', 'color:black');
            console.log('| OO       '+'%c| OO  | OO  | OO  | OO  '+'%c| OO / OO/        | OO  | OO        | OO  | OO', 'color: blue', 'color:black');
            console.log('| OO       '+'%c| OO  | OO  | OO  | OO  '+'%c| OOOOOO/     /OOOOOOO  | OOOOOOO\\  | OO  | OO', 'color: blue', 'color:black');
            console.log('| OO       '+'%c| OO  | OO  | OO  | OO  '+'%c| OO_  OO    |____  OO  | OO__  OO  | OO  | OO', 'color: blue', 'color:black');
            console.log('| OO       '+'%c| OO  | OO  | OO  | OO  '+'%c| OO \\  OO        | OO  | OO  | OO  | OO  | OO', 'color: blue', 'color:black');
            console.log('| OOOOOOOO '+'%c|  OOOOOO   |  OOOOOO   '+'%c| OO  | OO   |OOOOOOO   |  OOOOOO   |  OOOOOO ', 'color: blue', 'color:black');
            console.log('|________/ '+'%c \\_______/   \\_______/'+'%c  |___/ |___/	\\______/   \\_______/   \\_______/ ', 'color: blue', 'color:black');
            console.log('VR 콘텐츠 제작문의는 : (주)인디스팟 / %c070-7518-3600', 'color:blue');
            console.log('%chttps://look360.kr', 'color:blue');
            console.log('%c==================================================================================', 'color:red');
            
            krpano.value = document.getElementById("vr");
        })

        /**********/
        /* STATES */ 
        /**********/
        
        const currentThreatIdx = ref(null);
        const isLeftSideShow = ref(false);
        const isRightSideShow = ref(false);
        const krpano = ref(true);
        const threatImgRef= ref(null);
        // 위험요소 모든 목록
        const threatList = ref(THREATLIST);
        // 위험요소 평가 항목 - HIGH, MID, LOW, NONE
        const threatGrade = THREATGRADE;
        
        

        /************/
        /* COMPUTED */
        /************/ 
        const estimated = computed(() => {
            return threatList.value.filter(item =>{
                return item.grade != THREATGRADE.UNKNOWN;
            })
        })
        const unestimated = computed(() => {
            return threatList.value.filter(item =>{
                return item.grade == THREATGRADE.UNKNOWN;
            })
        })
        const currentThreatData = computed(() => {
            if(currentThreatIdx.value == null) return;
            return threatList.value[currentThreatIdx.value];
        })

        /***********/
        /* ACTIONS */ 
        /***********/
        // 위험요소 평가와 동일한 Badge의 경우, 색상을 빨강으로 변경
        const getBadgeClassForGradeMatchHigh = (current, grade) => {
            return current == grade?"bg-[#FFC5C5] text-[#757575] text-md font-['NEXON Lv2 Gothic'] mr-2 px-2.5 py-1.5 rounded": "bg-[#F4F4F4] text-[#757575] text-md font-['NEXON Lv2 Gothic'] mr-2 px-2.5 py-1.5 rounded"
        }
        const getBadgeClassForGradeMatchMid = (current, grade) => {
            return current == grade?"bg-[#FFE1C5] text-[#757575] text-md font-['NEXON Lv2 Gothic'] mr-2 px-2.5 py-1.5 rounded": "bg-[#F4F4F4] text-[#757575] text-md font-['NEXON Lv2 Gothic'] mr-2 px-2.5 py-1.5 rounded"
        }
        const getBadgeClassForGradeMatchLow = (current, grade) => {
            return current == grade?"bg-[#FFF2C5] text-[#757575] text-md font-['NEXON Lv2 Gothic'] mr-2 px-2.5 py-1.5 rounded": "bg-[#F4F4F4] text-[#757575] text-md font-['NEXON Lv2 Gothic'] mr-2 px-2.5 py-1.5 rounded"
        }
        const getBadgeClassForGradeMatchNone = (current, grade) => {
            return current == grade?"bg-[#D5F99B] text-[#757575] text-md font-['NEXON Lv2 Gothic'] mr-2 px-2.5 py-1.5 rounded": "bg-[#F4F4F4] text-[#757575] text-md font-['NEXON Lv2 Gothic'] mr-2 px-2.5 py-1.5 rounded"
        }

        const getButtonClassForGradeMatchHigh = (current, grade) => {
            return current == grade?"border-[1px] border-[#FFC5C5] bg-[#FFC5C5] text-[#757575] text-md font-['NEXON Lv2 Gothic'] mr-2 mb-2 px-4 py-3 rounded-lg": "border-[1px] border-[#DCDCDC] bg-[#F4F4F4] text-[#757575] text-md font-['NEXON Lv2 Gothic'] mr-2 mb-2 px-4 py-3 rounded-lg"
        }
        const getButtonClassForGradeMatchMid = (current, grade) => {
            return current == grade?"border-[1px] border-[#FFE1C5] bg-[#FFE1C5] text-[#757575] text-md font-['NEXON Lv2 Gothic'] mr-2 mb-2 px-4 py-3 rounded-lg": "border-[1px] border-[#DCDCDC] bg-[#F4F4F4] text-[#757575] text-md font-['NEXON Lv2 Gothic'] mr-2 px-4 py-3 rounded-lg"
        }
        const getButtonClassForGradeMatchLow = (current, grade) => {
            return current == grade?"border-[1px] border-[#FFF2C5] bg-[#FFF2C5] text-[#757575] text-md font-['NEXON Lv2 Gothic'] mr-2 mb-2 px-4 py-3 rounded-lg": "border-[1px] border-[#DCDCDC] bg-[#F4F4F4] text-[#757575] text-md font-['NEXON Lv2 Gothic'] mr-2 px-4 py-3 rounded-lg"
        }
        const getButtonClassForGradeMatchNone = (current, grade) => {
            return current == grade?"border-[1px] border-[#D5F99B] bg-[#D5F99B] text-[#757575] text-md font-['NEXON Lv2 Gothic'] mr-2 mb-2 px-4 py-3 rounded-lg": "border-[1px] border-[#DCDCDC] bg-[#F4F4F4] text-[#757575] text-md font-['NEXON Lv2 Gothic'] mr-2 px-4 py-3 rounded-lg"
        }

        const getYoutubeUrl = (videoUrl) =>{
            return videoUrl.indexOf("youtube.com/embed") != -1?videoUrl:`https://www.youtube.com/embed/${videoUrl}`
        }
        // 위험요소의 평가 Badge 클릭시, 평가가 변경
        const onClickGrade = (item, newGrade) => {
            let newThreatList = [...threatList.value];
            newThreatList[item.idx].grade = newGrade;
            threatList.value = newThreatList;
            if(item.grade == THREATGRADE.NONE){
                krpano.value.call(`copy(hotspot[${item.hotspot}].url, hotspot[${item.hotspot}].surl)`);
                krpano.value.call(`copy(hotspot[${item.hotspot}].checked, hotspot[${item.hotspot}].checked_none)`);
                krpano.value.call(`check_all_scene()`);
                krpano.value.call(`callwith(hotspot[${THREATLIST[item.idx].hotspot}], onaction);`);
            }
            if(item.grade == THREATGRADE.HIGH){
                krpano.value.call(`copy(hotspot[${item.hotspot}].url, hotspot[${item.hotspot}].hurl)`);
                krpano.value.call(`copy(hotspot[${item.hotspot}].checked, hotspot[${item.hotspot}].checked_high)`);
                krpano.value.call(`check_all_scene()`);
                krpano.value.call(`callwith(hotspot[${THREATLIST[item.idx].hotspot}], onaction);`);
            }
            if(item.grade == THREATGRADE.MID){
                krpano.value.call(`copy(hotspot[${item.hotspot}].url, hotspot[${item.hotspot}].murl)`);
                krpano.value.call(`copy(hotspot[${item.hotspot}].checked, hotspot[${item.hotspot}].checked_mid)`);
                krpano.value.call(`check_all_scene()`);
                krpano.value.call(`callwith(hotspot[${THREATLIST[item.idx].hotspot}], onaction);`);
            }
            if(item.grade == THREATGRADE.LOW){
                krpano.value.call(`copy(hotspot[${item.hotspot}].url, hotspot[${item.hotspot}].lurl)`);
                krpano.value.call(`copy(hotspot[${item.hotspot}].checked, hotspot[${item.hotspot}].checked_low)`);
                krpano.value.call(`check_all_scene()`);
                krpano.value.call(`callwith(hotspot[${THREATLIST[item.idx].hotspot}], onaction);`);
            }
        }
        const setIsRightSideHide = (item) => {
            krpano.value.call(`removehotspot(icon_click_check)`);
            krpano.value.call(`removehotspot(icon_click_check_2)`);
        }
        // 왼쪽 사이드 메뉴의 상태를 변경
        const setIsLeftSideShow = (l_isLeftSideShow) => {
            if(l_isLeftSideShow == 'true'){
                l_isLeftSideShow = true
                
            }
            isLeftSideShow.value = l_isLeftSideShow;
            document.getElementById('right_close_btn').click();
            setIsRightSideHide();
        }
        // 오른쪽 사이드 메뉴의 상태를 변경
        const setIsRightSideShow = (l_isRightSideShow, item) => {
            if(l_isRightSideShow == 'true'){
                l_isRightSideShow = true;
                isRightSideShow.value = l_isRightSideShow;
            }else if(l_isRightSideShow == 'false'){
                l_isRightSideShow = false;
                isRightSideShow.value = l_isRightSideShow;
            }
            if(l_isRightSideShow == 'true'){
                document.getElementById('left_close_btn').click();
            }
        }
        const krpanoOnClickThreatIcon = (idx) => {
            currentThreatIdx.value = idx;
        }
        const onClickVr = (item) => {
            document.getElementById('left_close_btn').click();
            if(item.scene) {krpano.value.call(`loadscene(${item.scene})`)}
            if(item.hotspot) {
                krpano.value.call(`looktohotspot(${item.hotspot}, get(view.fov))`);
                krpano.value.call(`callwith(hotspot[${item.hotspot}], onclick)`)
            }
        }
        const setKrpano = (_krpano) => {
            krpano.value = _krpano;
        }
        const onLoadImg = () => {
            const viewer = new Viewer(threatImgRef.value, {
                inline: true,
                navbar : false,
                title: false,
                fullscreen: false,
                toolbar: {
                    zoomIn: true,
                    zoomOut: true,
                    oneToOne: true,
                    reset: false,
                    prev: false,
                    play: {
                        show: false,
                        size: 'large',
                    },
                    next: false,
                    rotateLeft: false,
                    rotateRight: false,
                    flipHorizontal: false,
                    flipVertical: false,
                },
            });
        }
        defineExpose({
            setIsLeftSideShow,
            setIsRightSideShow,
            krpanoOnClickThreatIcon,
            setIsRightSideHide,
        })
        expose( {
            setIsLeftSideShow,
            setIsRightSideShow,
            krpanoOnClickThreatIcon,
            setIsRightSideHide,
        });

        onMounted(()=>{
            window.App.setIsLeftSideShow = setIsLeftSideShow;
            window.App.setIsRightSideShow = setIsRightSideShow;
            window.App.krpanoOnClickThreatIcon = krpanoOnClickThreatIcon;
            window.App.setIsRightSideHide = setIsRightSideHide;
            window.App.onClickGrade = onClickGrade;
        })
        return {
            // states
            currentThreatIdx, // krpano 에서 선택된 현재 클릭한 위험요소 index 번호
            currentThreatData, // currentThreatIdx를 이용하여 threatList에서 해당 위험요소 데이터를 모두 computed로 전달
            threatList,
            threatGrade,
            estimated,
            unestimated,
            isLeftSideShow,
            isRightSideShow,
            threatImgRef,

            // actions
            onClickGrade,
            onClickVr,
            getBadgeClassForGradeMatchHigh,
            getBadgeClassForGradeMatchMid,
            getBadgeClassForGradeMatchLow,
            getBadgeClassForGradeMatchNone,
            getButtonClassForGradeMatchHigh,
            getButtonClassForGradeMatchMid,
            getButtonClassForGradeMatchLow,
            getButtonClassForGradeMatchNone,
            getYoutubeUrl,
            setIsLeftSideShow,
            setIsRightSideShow,
            krpanoOnClickThreatIcon,
            setIsRightSideHide,
            onLoadImg,
        }
    },
}
</script>

<template>
    <div id="pano" style="width:100%;height:100%;"></div>
    <div class="absolute w-full left-0 top-0">
        <div class="relative">
            <transition name="slide-left-fade">
                <div v-if='isLeftSideShow' class="absolute left-0 top-5 pl-5 pr-5 pb-5 min-w-[1000px] max-w-[1000px] h-[95vh] rounded-r-[30px] ">
                    <div class="flex flex-col h-full ">
                        <div class="flex flex-low pb-0 mb-0 pt-2 z-10 ">
                            <div class="flex-auto pt-2 text-left w-[35%] h-[5vh]">
                                <h2 class="text-lg font-['VitroCore'] text-[#292929] ">평가 위험요인 ({{estimated.length}} / {{threatList.length}})</h2>
                            </div>
                            <div class="flex-auto -left-4 pt-2 text-left w-[100%] h-[5vh] ">
                                <h2 class="pt-1 text-sm text-left font-['NEXON Lv2 Gothic'] text-[#505050] ">평가된 위험요인 목록입니다. 평가가 완료되었다면 엑셀(Excel)다운로드 버튼을 눌러 평가표를 받아보세요.</h2>
                            </div>
                            <div class="flex-auto pt-0.5 pl-5 text-left w-[20%] h-[5vh] ">
                                <button class="w-[120px] py-1.5 left-10 px-1 mr-2 mb-2 text-sm font-medium text-white font-['NEXON Lv2 Gothic'] focus:outline-none bg-[#90D2F9] rounded-md hover:bg-[#2AA9F5] hover:text-white " onclick="downloadSelected();" >Excel 다운로드</button>
                            </div>
                            <div id="left_close_btn" class="flex-auto pt-2 text-right w-[2.5%] h-[5vh] self-end cursor-pointer" @click="isLeftSideShow=false; isRightSideShow=false">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-[#545454] font-bold hover:text-black w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                        <div class="overflow-hidden flex-auto p-2 w-[100%] h-[35%] bg-[#F8F8F8] rounded-[15px] shadow-[0px_2px_5px_4px_rgba(117,117,117,0.4)] z-10">
                            <div class="scroll font-['NEXON Lv2 Gothic'] text-[#757575] box1 p-2 flex-auto relative overflow-y-auto p-2 w-[100%] h-[100%]">
                                <ul class="h-[inherit] space-y-2 pl-0 text-left text-gray-500 dark:text-gray-400">
                                    <li class="flex items-center space-x-3 flex" v-for="(item, itemIdx) in estimated" :key="`itemIdx_${item.index}`">
                                        <div class="flex-auto flex items-center w-[100%] h-[50px] bg-[#FFFFFF] rounded-md shadow-[0px_2px_5px_1px_rgba(117,117,117,0.4)]">
                                            <div class="flex-auto flex items-center">
                                                <img src="/assets/web/check_green.svg" class="ml-2 mr-2 w-5 text-[#81E046]" />
                                                <span>{{item.threat}}</span>
                                            </div>
                                            <div class="flex-none pb-0.5 pl-2 font-['NEXON Lv2 Gothic']">
                                                <span class='cursor-pointer hover:bg-[#FFC5C5]' :class="getBadgeClassForGradeMatchHigh(item.grade, threatGrade.HIGH)" @click="onClickGrade(item, threatGrade.HIGH)">상</span>
                                                <span class='cursor-pointer hover:bg-[#FFE1C5]' :class="getBadgeClassForGradeMatchMid(item.grade, threatGrade.MID)" @click="onClickGrade(item, threatGrade.MID)">중</span>
                                                <span class='cursor-pointer hover:bg-[#FFF2C5]' :class="getBadgeClassForGradeMatchLow(item.grade, threatGrade.LOW)" @click="onClickGrade(item, threatGrade.LOW)">하</span>
                                                <span class='cursor-pointer hover:bg-[#D5F99B]' :class="getBadgeClassForGradeMatchNone(item.grade, threatGrade.NONE)" @click="onClickGrade(item, threatGrade.NONE)">해당없음</span>
                                            </div>
                                            <div class="flex-none pb-0.5">
                                                <span class="cursor-pointer text-white text-md font-['NEXON Lv2 Gothic'] mr-2 px-2.5 py-1.5 rounded bg-[#90D2F9] hover:bg-[#2AA9F5]" @click="onClickVr(item)">관련 VR</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="flex flex-low mt-2 pt-2 h-[7%] z-10">
                            <div class="flex-auto pt-3 text-left w-[30%]">
                                <h2 class="mb-6 text-lg font-['VitroCore'] text-[#292929] ">미평가 위험요인 ({{unestimated.length}} / {{threatList.length}})</h2>
                            </div>
                            <div class="flex-auto pt-3 text-left w-[100%]">
                                <h2 class="pt-1 text-sm text-left font-['NEXON Lv2 Gothic'] text-[#505050] ">미평가된 위험요인 목록입니다. 관련 VR 버튼을 눌러 해당하는 위험요인과 관련 있는 작업 현장을 확인해 보세요.</h2>
                            </div>
                        </div>
                        <div class="overflow-hidden flex-auto p-2 w-[100%] h-[35%] bg-[#F8F8F8] rounded-[15px] shadow-[0px_2px_5px_4px_rgba(117,117,117,0.4)] z-10">
                            <div class="scroll box1 font-['NEXON Lv2 Gothic'] text-[#757575] pr-2 flex-auto relative overflow-y-auto p-2 w-[100%] h-[100%]">
                                <ul class="h-[inherit] space-y-2 pl-0 text-left text-gray-500 dark:text-gray-400">
                                    <li class="w-full items-center space-x-3 flex" v-for="(item, itemIdx) in unestimated" :key="`itemIdx_${item.index}`">
                                        <div class="flex-auto flex items-center w-[100%] h-[50px] bg-[#FFFFFF] rounded-md shadow-[0px_2px_5px_1px_rgba(117,117,117,0.4)]">
                                            <div class="flex-auto flex items-center">
                                                <img src="/assets/web/check_nomal.svg" class="ml-2 mr-2 w-5" />
                                                <span>{{item.threat}}</span>
                                            </div>
                                            <div class="flex-none pb-0.5 pl-2">
                                                <span class="cursor-pointer hover:bg-[#FFC5C5]" :class="getBadgeClassForGradeMatchHigh(item.grade, threatGrade.HIGH)" @click="onClickGrade(item, threatGrade.HIGH)">상</span>
                                                <span class="cursor-pointer hover:bg-[#FFE1C5]" :class="getBadgeClassForGradeMatchMid(item.grade, threatGrade.MID)" @click="onClickGrade(item, threatGrade.MID)">중</span>
                                                <span class="cursor-pointer hover:bg-[#FFF2C5]" :class="getBadgeClassForGradeMatchLow(item.grade, threatGrade.LOW)" @click="onClickGrade(item, threatGrade.LOW)">하</span>
                                                <span class="cursor-pointer hover:bg-[#D5F99B]" :class="getBadgeClassForGradeMatchNone(item.grade, threatGrade.NONE)" @click="onClickGrade(item, threatGrade.NONE)">해당없음</span>
                                            </div>
                                            <div class="flex-none pb-0.5">
                                                <span class="cursor-pointer text-white text-md font-['NEXON Lv2 Gothic'] mr-2 px-2.5 py-1.5 rounded bg-[#90D2F9] hover:bg-[#2AA9F5]" @click="onClickVr(item)">관련 VR</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="absolute left-0 pl-5 pr-5 pb-5 min-w-[1000px] max-w-[1000px] h-[95vh] bg-[#FFFFFF] rounded-r-[30px] opacity-95" />
                    </div>
                </div>
            </transition>
        </div>
        <div class="relative">
            <transition name="slide-right-fade">
                <div v-if='isRightSideShow' class="absolute right-0 top-5 pl-5 pr-5 pb-5 min-w-[400px] max-w-[400px] h-[95vh] rounded-l-[30px]">
                    <div class="flex flex-col">
                        <div class="flex-auto p-2 w-[100%] bg-[#FFFFFF] rounded-[30px] opacity-95 z-10">
                            <div class="flex flex-low pb-0 mb-0 pt-2 z-10 ">
                                <div class="flex-auto pl-5 pr-8 text-left w-[99%] h-[30px] ">
                                    <h2 class="text-lg font-['VitroCore'] text-[#292929] ">유해 ・ 위험요인 파악</h2>
                                </div>
                                <div id="right_close_btn" class="flex-auto text-left w-[10%] pb-1 self-end cursor-pointer" @click="isRightSideShow=false">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-[#545454] font-bold hover:text-black w-5 h-5" @click="setIsRightSideHide(item)">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                            <div class=" p-2 flex-auto relative w-[100%] ">
                                <div v-if="currentThreatData" class="flex-1 p-0 relative place-items-center ">
                                    <div v-if="currentThreatData" class="flex items-center justify-center bg-[#E3E3E4] cursor-pointer relative" >
                                        <img v-if="!currentThreatData.image && !currentThreatData.video" class='max-w-full max-h-[200px] cursor-pointer' src="/assets/web/none_image.png" />
                                        <img v-if="currentThreatData.image" class='max-w-full max-h-[200px] cursor-pointer' :src="currentThreatData.image" @click="openModal(currentThreatData.image)" @mouseover="showZoomIcon = true" @mouseout="showZoomIcon = false" />
                                        <div v-if="showZoomIcon" class="absolute w-[100px] h-[100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                            <img src="/assets/web/zoom_icon.svg" class="w-full h-full opacity-30" />
                                        </div>
                                    </div>
                                    <div v-if="currentThreatData.video" class='max-w-full'>
                                        <video v-if='currentThreatData.video && (currentThreatData.video.indexOf(".mp4") != -1 || currentThreatData.video.indexOf(".webm") != -1)' controls :key="currentThreatData.video">
                                            <source :src="currentThreatData.video" :type="currentThreatData.videoType">
                                        </video>
                                        <iframe v-else-if='currentThreatData.videoType && currentThreatData.video && currentThreatData.videoType == "youtube"'
                                            class="w-full min-h-[207px]"
                                            :src="getYoutubeUrl(currentThreatData.video)">
                                        </iframe>
                                    </div>
                                    <h2 class="mt-5 text-md font-['NEXON Lv2 Gothic'] text-[#505050] ">{{currentThreatData.threat}}</h2>
                                </div>
                            </div>
                        </div>
                        <div id="parent" class="flex-auto mt-3 p-4 w-[100%] bg-[#FFFFFF] rounded-[30px]">
                            <div class="flex-auto pl-3 pr-8 text-left w-[99%] ">
                                <h2 class="text-lg font-['VitroCore'] text-[#292929] ">위험성 결정</h2>
                            </div>
                            <div class="mt-2 text-center font-['NEXON Lv2 Gothic'] text-[#505050] ">
                                <button class="hover:bg-[#FFC5C5]" :class="getButtonClassForGradeMatchHigh(currentThreatData.grade, threatGrade.HIGH)" @click="onClickGrade(currentThreatData, threatGrade.HIGH)">상</button>
                                <button class="hover:bg-[#FFE1C5]" :class="getButtonClassForGradeMatchMid(currentThreatData.grade, threatGrade.MID)" @click="onClickGrade(currentThreatData, threatGrade.MID)">중</button>
                                <button class="hover:bg-[#FFF2C5]" :class="getButtonClassForGradeMatchLow(currentThreatData.grade, threatGrade.LOW)" @click="onClickGrade(currentThreatData, threatGrade.LOW)">하</button>
                                <button class="hover:bg-[#D5F99B]" :class="getButtonClassForGradeMatchNone(currentThreatData.grade, threatGrade.NONE)" @click="onClickGrade(currentThreatData, threatGrade.NONE)">해당없음</button>
                            </div>
                        </div>
                        <div id="parent" class="flex-auto mt-3 p-4 w-[100%] bg-[#FFFFFF] rounded-[30px]">
                            <div class="flex flex-low h-[7%] z-10 ">
                                <div class="flex-auto text-left w-[100%] h-[40px] ">
                                    <h2 class="text-lg pl-3 font-['VitroCore'] text-[#292929] ">위험성 감소대책의 수립</h2>
                                </div>
                            </div>
                            <div id="child" class="overflow-hidden opacity-100 flex-auto p-2 w-[100%] bg-[#F8F8F8] rounded-[15px] shadow-[0px_2px_5px_4px_rgba(117,117,117,0.4)] z-10" >
                                <div class="scroll box1 p-2 flex-auto relative overflow-y-auto p-2 w-[100%] max-h-[25vh]">
                                    <ul class="h-[inherit] space-y-0 pl-0 text-left font-['NEXON Lv2 Gothic'] text-[#505050] ">
                                        <li v-for="(item, itemIdx) in currentThreatData.countermeasure" :key="`itemIdx_${item.index}`" class="w-full items-center space-x-3 flex">
                                            <div class="flex-auto flex mt-2 mb-2 items-center w-[100%] min-h-[50px] bg-[#FFFFFF] rounded-md shadow-[0px_2px_5px_1px_rgba(117,117,117,0.4)]">
                                                <div class="flex-auto flex items-left pt-1 pb-1 pl-5 pr-5">
                                                    <span class="text-left ">{{item}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
    <div v-if="modalOpen" id='modal' class="fixed inset-0 flex items-center justify-center z-50 ">
        <div class="fixed inset-0 bg-black bg-opacity-50" @click="modalOpen = !modalOpen"></div>
        <div class="fixed z-10 w-4/5 md:w-3/5 lg:w-3/5 bg-white rounded-lg shadow-lg p-4 max-h-[90vh] max-w-[90vh] w-full h-full">
            <img :src="selectedImage" ref='threatImgRef' class="hidden w-[calc(90% - 100px)] h-auto" alt="Modal Image" @load="onLoadImg(currentThreatData)"  />
            <!-- @load="resizeImage" -->
            <button @click="closeModal" class="absolute top-0 right-0 mt-2 mr-2 px-4 py-2 font-['NEXON Lv2 Gothic'] focus:outline-none bg-[#90D2F9] rounded-md hover:bg-[#2AA9F5]">Close</button>
        </div>
    </div>
</template>


<style>
    #app {
        width: 100%;
        height: 100%;
    }
    #modal *{
        --modal-radius: 0.5rem;
    }
    #modal .viewer-container{
        border-radius: var(--modal-radius);
    }
    #modal .viewer-container .viewer-button.viewer-fullscreen{
        display: none;
    }
    
</style>
