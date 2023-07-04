<template>
  <div id="applyOrder">
    <van-nav-bar title="网络接入申请工单" @click-left="onClickLeft" class="topNavFix">
      <template #left>
        <van-icon name="arrow-left" color="#fff" size="18" />
      </template>
    </van-nav-bar>
    <div class="infoSubAll" v-show="!mapShow">
      <van-form @submit="onSubmit" :label-width="110" :scroll-to-error="true">
        <div class="infoSubTop">
          <div class="infoSubOne">
            <div class="addLiAll">
              <van-field clearable class="tipTrue" input-align="right" error-message-align="right"
                v-model.trim="subInfo.xlazdz" name="线路安装地址" label="线路安装地址" placeholder=""
                :rules="[{ required: true, message: '线路安装地址' }]" @click-right-icon="goMap" right-icon="location"
                disabled />
              <van-field clearable class="tipTrue" input-align="right" error-message-align="right"
                v-model.trim="subInfo.xxdz" name="详细地址" label="详细地址" placeholder="详细地址"
                :rules="[{ required: true, message: '请输入详细地址' }]" />
              <div class="contBtnAll">
                <van-button round block type="info" native-type="submit" :loading="subFlag"
                  loading-type="spinner">提交工单</van-button>
              </div>
            </div>
          </div>
        </div>
      </van-form>
    </div>
    <div v-show="mapShow">
      <GoMap ref="mapFnAll" @getAreaInfo="getAreaInfo" @showChange="showChange"></GoMap>
    </div>
  </div>
</template>
 
<script>

// import { orderSubmitSave } from '@/api/userApi/index.js'
import GoMap from "@/components/GoMap";
export default {
  name: 'ApplyOrder',
  data() {
    return {
      showSub: false,
      mapShow: false,
      subFlag: false,
      subInfo: {
        xlazdz: '',
        xxdz: '',
        provinceName: '',
        cityName: '',
        districtName: '',
        districtCode: ''
      },
      locationObj: null
    }
  },
  components: {
    GoMap
  },
  mounted() {
    if (this.mapShow) {
      this.$refs.mapFnAll.init()
    }
  },
  methods: {
    showChange(item) {
      this.mapShow = item
    },
    getAreaInfo(item) {
      this.mapShow = false
      this.locationObj = JSON.parse(JSON.stringify(item))
      this.subInfo.xlazdz = `经度：${this.locationObj.position[0]}，纬度：${this.locationObj.position[1]}`
      this.subInfo.xxdz = this.locationObj.address
      this.subInfo.provinceName = this.locationObj.regeocode.addressComponent.province
      this.subInfo.cityName = this.locationObj.regeocode.addressComponent.city
      this.subInfo.districtName = this.locationObj.regeocode.addressComponent.district
      this.subInfo.districtCode = this.locationObj.regeocode.addressComponent.adcode
      console.log('222', this.locationObj)
    },
    goMap() {
      this.mapShow = true
      this.$refs.mapFnAll.init()
    },
    getSubmitSave() {
      const data = {
        lineInstallAddrLongitudeLatitude: this.subInfo.xlazdz,
        detailAddr: this.subInfo.xxdz,
        provinceName: this.subInfo.provinceName,
        cityName: this.subInfo.cityName,
        districtName: this.subInfo.districtName,
        districtCode: this.subInfo.districtCode
      }
      this.subFlag = true
      // orderSubmitSave(data).then(
      //   (resp) => {
      //     if (resp.code === 0) {
      //       this.showSub = true
      //       setTimeout(() => {
      //         this.$router.push({
      //           path: '/homePage'
      //         })
      //       }, 3000)
      //     } else {
      //       this.$toast.fail(resp.errorMessage)
      //     }
      //     this.subFlag = false
      //   },
      //   (error) => {
      //     this.subFlag = false
      //     this.$toast.fail(error)
      //   }
      // )
    },
    onSubmit() {
      this.getSubmitSave()
    },
    onClickLeft() {
      console.log('1121')
      this.$router.push('/homePage')
    }
  },
}
</script>
 
<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .subSucess {
    width: 230px;
    height: 194px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .subPic {
      width: 41px;
      height: 41px;
      background: url("~@/assets/imgs/subSucess.png") no-repeat;
      background-size: cover;
    }

    .subName {
      font-size: 20px;
      color: #333;
      margin-top: 14px;
      margin-bottom: 4px;
      font-weight: 700;
    }

    .subText {
      font-size: 12px;
      color: #666;
      margin-bottom: 20px;
    }

    .subBtn {
      width: 76px;
      height: 30px;
      border: 1px solid #999;
      border-radius: 2px;
      text-align: center;
      line-height: 30px;
      color: #999;
      font-size: 14px;
    }
  }
}

.topNavFix {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #005dff;

  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}

.infoSubAll {
  width: 100%;
  padding: 46px 12px 0;
  box-sizing: border-box;
  border: 1px solid #f4f7fe;
  background: #f4f7fe;

  .infoSubTop {
    // padding-bottom: 86px;
    box-sizing: border-box;
    margin-bottom: 24px;

    .infoSubOne {
      .subTitle {
        display: flex;
        align-items: center;
        padding: 15px 0px;
        box-sizing: border-box;

        .subTitleBg {
          width: 4px;
          height: 17px;
          margin-right: 8px;
          background: #005dff;
          border-radius: 0px 4px 4px 0px;
        }

        .subTitleText {
          color: #333;
          font-size: 14px;
        }
      }

      .addLiAll {
        display: flex;
        flex-direction: column;
        padding: 0px 12px;
        box-sizing: border-box;
        border-radius: 8px;
        background: #fff;

        ::v-deep .van-cell {
          padding: 15px 0px;
          border-bottom: 1px solid #ebedf0;
        }

        ::v-deep .van-cell::after {
          border-bottom: 0;
        }

        ::v-deep .van-cell:nth-last-child(1) {
          border-bottom: 0;
        }

        .tipTrue {
          ::v-deep .van-cell__title {
            span::after {
              color: #f12b44;
              font-size: 14px;
              content: "*";
              margin-left: 6px;
            }
          }

          ::v-deep .van-field__control::placeholder {
            color: #c8c9cc;
          }

          ::v-deep .van-icon-location {
            color: #005dff;
            font-size: 20px;
          }
        }

        .uploadAll {
          display: flex;
          justify-content: space-between;
          padding: 15px 0px;
          box-sizing: border-box;

          .uploadName {
            font-size: 14px;
            color: #646566;

            .tipRed {
              color: #f12b44;
              font-size: 14px;
              margin-left: 6px;
            }
          }

          .uploadStyl {
            ::v-deep .van-button {
              width: 70px;
              height: 24px;
              border-radius: 20px;
              font-size: 12px;
            }

            ::v-deep .van-button--info {
              background-color: #005dff;
              border: 1px solid #005dff;
            }
          }
        }

        .uploadText {
          display: flex;
          align-items: center;
          padding: 15px 0px;
          box-sizing: border-box;
          border-top: 1px solid #ebedf0;

          .textLeft {
            font-size: 14px;
            color: #333;
            margin-right: 20px;
          }

          .textRit {
            font-size: 14px;
            color: #333;
          }
        }

        .contBtnAll {
          width: 100%;
          padding: 20px 48px;
          box-sizing: border-box;
          background: #fff;

          ::v-deep .van-button--info {
            background-color: #005dff;
            border: 1px solid #005dff;
            width: 100%;
            height: 46px;

            .van-button__text {
              margin-left: 12px;
            }
          }
        }
      }
    }
  }
}
</style>