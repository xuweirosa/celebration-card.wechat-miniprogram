// index.js
Page({
    data:{
        isMe: true,
        toName: 'Dears',
        mainText: '祝大家前程似锦',
        fromName: 'Rosa',
        isPlaying: true, // 音乐是否播放中
        musicSrc: "music/bgm.mp3",
        innerAudioContext: null,
        isDisabled: false,
        userInfo: null,
        nickName: "jo",
        avatarUrl: null,
    },
    onLoad(option) {
        const {toname: toName, maintext: mainText, fromname: fromName, receiver} = option;
        const isMe = (receiver!=='1');

        this.setData({isMe});

        if(toName){ // 如果不加条件判断，就可能会出现undefined的情况
            this.setData({toName})
        };
        if(mainText){
            this.setData({mainText})
        };
        if(fromName){
            this.setData({fromName})
        };

        // this.setData({
        //     toName,
        //     mainText,
        //     fromName,
        // });

        // 自动播放歌曲
        this.setData({
            innerAudioContext: wx.createInnerAudioContext()
        });
        this.data.innerAudioContext.src = this.data.musicSrc;
        this.data.innerAudioContext.autoplay = true;
        this.data.innerAudioContext.loop = true;
        this.setData({
            isPlaying: true,
        })

        // 转发时不允许输入
        if(!this.data.isMe){
            this.setData({
                isDisabled: true,
            });
        };

        // 获取当前用户信息
        let that = this;
        wx.getUserInfo({
          success: function(res) {
            let userInfo = res.userInfo;
            that.setData({
              nickName: userInfo.nickName,
              avatarUrl: userInfo.avatarUrl
            });
          }
        });
        
    },
    onUnload() {
        this.data.innerAudioContext.destroy();
        this.setData({
            isPlaying: false,
        })
    },
    toNameInput(e) {
        // 取得页面最新的输入值
        const { value } = e.detail;
        this.setData({
            toName: value,
        });
    },
    mainTextInput(e) {
        const {value} = e.detail;
        this.setData({
            mainText: value,
        });
    },
    fromNameInput(e) {
        const {value} = e.detail;
        this.setData({
            fromName: value,
        });
    },
    onShareAppMessage() {
        const {toName, mainText, fromName} = this.data; // 把最新的值取出来
        return {
            title: '叮，你收到一张贺卡',
            path: `pages/index/index?receiver=1&toname=${toName}&maintext=${mainText}&fromname=${fromName}`,
        }
    },
    playMusic() {
        this.data.innerAudioContext.play();
        this.setData({
            isPlaying:true,
        })
    },
    pasueMusic() {
        this.data.innerAudioContext.pause();
        this.setData({
            isPlaying: false,
        })
    },
})
