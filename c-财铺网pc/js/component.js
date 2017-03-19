// JavaScript Document
/*
 *componet v1.1.02
 *author:彭政
 *以扩展jquery对象方式编写各个部件
 *插件编写整体构架思路：
 *1.各个功能都直接扩展到jquery对象上
 *2.各个扩展都接受一个options对象参数
 *3.各个插件内的config对象都为options的默认配置(options的属性及说明可完全参照config)
 *4.各个插件都通过代码options = $.extend(true, config, options);把config默认配置合并到options配置上
 *5.各个插件主体代码都采用with(options){……}结构编写
 *6.各个插件扩展都可以通过增加options（config）的属性，并在with(options){……}内添加相关代码即可。
 *7.各个插件可以组合使用，以实现更复杂的js效果
 */
$(function() {
    //直接添加到jquery上的ui效果组件;
    $.extend({
        SimulationSelect: function(options) { //模拟select下拉选择框js
            /*------------------------------------使用案例-----------------------------
		html:
		<div class="fl expend-select w125 mr10">
        					    <div class="input-wramp">  
            						<span type="text" class="input"><span>片区选择</span><b class="ico"></b></span>
                                    <input type="hidden"/>
                                </div>
            					<div class="options">
                                    <ul>
                                        <li class="option checked" value="1">不限</li>
                                        <li class="option" value="2">宝安中心区</li>
                                        <li class="option" value="3">福永</li>
                                        <li class="option" value="4">公明</li>
                                        <li class="option" value="5">宝安中心区</li>
                                        <li class="option" value="6">福永</li>
                                        <li class="option" value="7">公明</li>
                                        <li class="option" value="8">宝安中心区</li>
                                        <li class="option" value="9">福永</li>
                                        <li class="option" value="10">公明</li>
                                    </ul>
            					</div>
        					</div>
		js:$.simulationSelect({container:$('.expend-select')});
		*/
            //设置默认配置
            var container = options.container;
            var input = $('.input', container);
            var hidden = $('input:hidden', container);
            var text = input.find('span').first();
            text = text.length ? text : input;
            hidden.length || void(hidden = $('<input type="hidden"/>').insertAfter(input));
            var config = {
                container: container,
                input: input,
                text: text,
                hidden: hidden,
                optionContainer: $('.options', container),
                optionTag: '.option',
                inputClass: '',
                optionClass: '',
                delegateElement: $('body'),
                //委托对象
                capture: true

            };
            var options = $.extend(true, config, options);

            with(options) {
                container.each(
                    function() {
                        $(this).hover(
                            function() {
                                var options_element =  $(this).find('.options');
                                if (options_element.find(' li').length > 0) {
                                    $(this).addClass('hover');
                                }

                            },
                            function(){
                                var options_element =  $(this).find('.options');
                                    $(this).removeClass('hover');
                            });
                    });

                delegateElement.click(function(e) {
                    capture && input.removeClass(inputClass); //&& optionContainer.filter(':visible').hide();
                    capture = true;
                });
                input.click(function() {
                    capture = false;
                    input.toggleClass(inputClass);
                    //optionContainer.toggle();
                });
                optionContainer.on('click', optionTag, function(e) {
                    var target = $(e.target);
                    hidden.val(target.attr('val'));
                    text.text(target.text());
                    optionContainer.find(optionTag).removeClass(optionClass);
                    target.addClass(optionClass);
                });

            }

        },
        initForm: function(options) {
            //设置默认配置
            var config = {
                defaultClass: 'gray',
                element: null
            };
            var options = $.extend(true, config, options);
            with(options) {
                element.each(function() {
                    var me = $(this);
                    var defaultValue = me.attr('default') || '';
                    if (!defaultValue) return true;
                    var value = $.trim(me.val()) || '';
                    if (!value || value == defaultValue) {
                        me.val(defaultValue);
                        me.addClass(defaultClass);
                    }
                    me.focus(function() {
                        me.removeClass(defaultClass);
                        if (me.val() == defaultValue) {
                            me.val('');
                        }
                        //清空当前默认值

                    });
                    me.blur(function() {
                        if (!me.val()) {
                            me.val(defaultValue);
                            me.addClass(defaultClass);
                        }

                    });

                });

            }

        },
        deleteElement: function(optiosn) {
            var config = {
                button: null,
                //删除按钮
                element: null
                //删除元素，默认为删除按钮的父元素

            };
            var options = $.extend(true, config, options);

            with(options) {
                element.length || (element = button.parent());
                button.click(function() {
                    element.remove();
                });

            }

        },
        hoverFixedBoard: function(options) {
            var config = {
                board: null,
                delegateElement: $(document)


            };
            var options = $.extend(true, config, options);
            with(options) {
                //board.css('position','relative');
                delegateElement.hover(function() {
                        board.show();
                    },
                    function() {
                        board.hide();
                    });

            }

        },
        delegateClick: function(options) {
            var config = {
                button: null,
                board: null,
                delegateElement: $('body'),
                activeClass: ''

            };
            var options = $.extend(true, config, options);
            options._index = false;
            //私有属性
            with(options) {
                board.click(function(e) {
                    e.stopPropagation();
                });
                //面板内元素点击时阻止事件传播
                button.click(function() {
                    var me = $(this);
                    activeClass && button.filter('.' + activeClass).removeClass(activeClass);
                    me.addClass(activeClass);
                    _index = button.index(me);

                });
                delegateElement.click(function() {
                    board.filter(':visible').hide();
                    false !== _index && board.eq(_index).show();
                    _index = false;
                    //board.filter(function(){return $(this).data(flag)||false}).data(flag,false);

                })

            }

        },
        toggleElement: function(options) {
            //两组元素交替显示
            var config = {
                button: null,
                //按钮，一般按钮也需要显示交替显示
                defaultShowElement: null,
                //初始化时为显示状态的一组元素
                deFaultHideElement: null
                //初始化时为隐藏状态的一组元素

            }
            var options = $.extend(true, config, options);
            with(options) {
                button.click(function() {
                    defaultShowElement.add(deFaultHideElement).toggle();

                });

            }

        },
        hoverElement: function(options) {
            var config = {
                defaultElement: null,
                //初始化时为显示状态的一组元素
                hoverElement: null
                //初始化时为隐藏状态的一组元素

            }
            var options = $.extend(true, config, options);
            with(options) {
                //获取defaultElement元素的基本属性
                //	var offset=defaultElement.offset();
                //	var zIndex=defaultElement.css('z-index');
                //	var size={};
                //	size.width=defaultElement.width();
                //	size.hieght=defaultElement.height();
                //	//对hoverElement执行初始化定位
                //	hoverElement.css({
                //		position:'absolute',
                //		
                //	});
                var element = defaultElement.add(hoverElement);
                element.hover(function() {
                        element.toggle();
                    },
                    function() {
                        element.toggle();
                    });

            }

        },
        activFixedBoard: function(options) {
            var config = {
                button: null,
                //可以为数组，但是下标必须和board的下标对应
                board: null,
                //可以为数组，但是下标必须和button的下标对应
                delegateElement: $(document),
                btnActiveClass: 'active',
                flagData: 'show'

            };
            var options = $.extend(true, config, options);
            with(options) {
                var button = $(button);
                var board = $(board);
                board.click(function(e) {
                    e.stopPropagation();
                });
                //面板内元素取消事件传播机制
                button.click(function() {
                    //绑定按钮点击事件
                    var me = $(this);
                    var others = button.not(me);
                    others.removeClass(btnActiveClass);
                    var index = me.index();
                    board.eq(index).data('flagData', true);

                });
                delegateElement.click(function() {
                    var board = $(board);
                    board.filter(':visible').hide();
                    var activeBoard = board.filter(function() {
                        return $(this).data(flagData) || false;
                    });
                    activeBoard.length && activeBoard.show().data(flagData, false);

                });

            }

        },
        selectAll: function(options) {
            //权限模块
            //设置默认配置
            var config = {
                button: null,
                //全选按钮
                checkboxs: null
                //全选按钮控制的checkbox框

            };
            var options = $.extend(true, config, options);
            with(options) {
                button.click(function() {
                    checkboxs.prop('checked', $(this).prop('checked'));
                });
                checkboxs.click(function() {
                    $(this).prop('checked') ? '' : button.prop('checked', false);
                    checkboxs.not(':checked').length ? '' : button.prop('checked', true);

                });


            }

        },
        active: function(options) {
            //标记当前活跃标签模块
            var config = {
                element: null,
                //标签元素
                currentClass: 'current'
                //当前标签样式

            };
            var options = $.extend(true, config, options);
            with(options) {
                element.click(function() {
                    element.removeClass(currentClass);
                    $(this).addClass(currentClass);

                });

            }

        },
        tab: function(options) {
            var config = {
                tabs: null, //标签
                contents: null, //标签对应显示的内容容器（内容和tab的下标必须对应，代码中通过对应下标将两个元素关联）
                currentClass: 'current', //活动标签样式
                hideClass: 'hide' //隐藏元素样式
            };
            var options = $.extend(true, config, options);
            with(options) {
                tabs.each(function() {
                    $(this).click(function() {
                        var me = $(this);
                        var index = tabs.index(me);
                        tabs.removeClass(currentClass);
                        contents.addClass(hideClass);
                        me.addClass(currentClass);
                        contents.eq(index).removeClass(hideClass);

                    });
                });


            }


        },
        pop: function(options) {
            var config = {
                container: null, //遮罩层上弹出的内容外围容器
                closeButton: null, //关闭按钮，默认为container内带有close样式的元素（在后面程序内有默认值赋值操作）
                autoShow: true,
                positionWay: 'fixed',
                position: {
                    left: 0.5,
                    top: 0.5
                },
                //定位点，默认定位到容器（屏幕）中央
                hide: { //显示后是否自动隐藏，默认为false，默认消失动画时间为100毫秒
                    auto: false,
                    time: 100
                },
                modal: true, //是否需要遮罩，默认显示遮罩
                opacity: 0.3,
                //遮罩透明度，默认为0.3
                zIndex: 999999
                //container元素样式z-index属性,默认高度为9999

            };
            //合并默认配置
            var options = $.extend(true, config, options);
            if (!options.container.length) {
                return false;
            }
            //定位并初始化；
            options.closeButton = options.closeButton || options.container.find('.close');
            options.container.setPosition({
                //调用扩展的position方法
                position: options.position,
                zIndex: options.zIndex,
                opacity: options.opacity,
                autoShow: options.autoShow,
                modal: options.modal,
                positionWay: options.positionWay

            });

            //获取遮罩层
            var modal = $('#my-modal-exist');
            //关闭按钮事件
            if (options.closeButton) {
                options.closeButton.click(function() {
                    options.container.add(modal).fadeOut(parseInt(options.hide.time));
                    return false;

                });

            }
            //自动隐藏动画
            if (options.hide.auto) {
                options.closeButton.click();
            }

        },
        countWords: function(options) {
            var config = {
                element: null,
                tips: null,
                maxLength: 50
            };
            //合并默认配置
            var options = $.extend(true, config, options);
            with(options) {
                if (!tips) {
                    tips = $('<span/>');
                    element.after(tips);
                }
                element.keyup(function() {
                    var me = $(this);
                    me.val(me.val().substr(0, maxLength)); //截取字符长度
                    var length = me.val().length;
                    tips.text(length + '/' + maxLength);
                });
            }
        },
        testWords: function(options) {
            var config = {
                container: null,
                textarea: null,
                //Textarea输入框
                tips: null,
                //提示框，若不存在则自动生成span并插入到textarea之后
                maxLength: 150
                //最多字符数，默认150个

            };
            //合并默认配置
            var options = $.extend(true, config, options);
            with(options) {
                textarea.keyup(function() {
                    //评论内容字数
                    var me = $(this);
                    me.val(me.val().substr(0, maxLength));
                    //截取字符长度
                    var length = me.val().length;
                    var residue = maxLength - length;
                    tips || (tips = $('<span/>'), textarea.after(tips));
                    //tips不存在时，默认生成相关元素
                    tips.text('你已输入'.concat(length, '个字，还可以输入', residue, '个字'));

                });

            }

        },
        multiSelect: function(options) {
            var config = {
                container: null,
                labels: null,
                input: null,
                inputVal: '',
                tips: null,
                tipsOffset: {},
                selectedClass: '',
                maxSelect: 5,
                time: 3000

            };
            //合并默认配置
            var options = $.extend(true, config, options);
            options.input = options.inupt || options.container && options.container.find('input:text');
            options.inputVal = options.input && options.input.after('<span/>').next('span');
            if ($.isEmptyObject(options.tipsOffset.left)) {
                //设置默认偏移量
                options.tipsOffset.left = parseInt(options.labels.first().width() * 0.628);
                options.tipsOffset.top = parseInt(options.labels.first().height() * 0.628);

            }
            options.labels.click(function(e) {
                var me = $(this);
                me.toggleClass(options.selectedClass);
                //切换选中样式;
                var enough = options.labels.filter('.'.concat(options.selectedClass)).length > options.maxSelect;
                //此行代码必须在上一代码之后;
                if (enough) {
                    //如果超过最多选项，则取消对当前元素添加选中样式，并显示提示
                    me.removeClass(options.selectedClass);
                    var position = me.offset();
                    position.left += options.tipsOffset.left;
                    position.top += options.tipsOffset.top;
                    options.tips = options.tips || $('<div class="j-tips" style="position: absolute;display: none;"></div>').appendTo('body');
                    options.tips.css({
                        position: 'absolute',
                        left: position.left,
                        top: position.top

                    });

                    options.tips.text('标签不能大于'.concat(options.maxSelect, '个!')).stop(false, true).show().fadeOut(options.time);

                }
                var input = me.find('input:text');
                if (!input.length || enough || !me.hasClass(options.selectedClass)) {
                    return false;
                }
                input.css('display', 'inline');
                options.inputVal.text('');
                options.input.focus();
                return false;

            });
            //输入框处理
            options.input && options.input.click(function() {
                var me = $(this);
                return 'none' != me.css('display') && !me.parent().hasClass(options.selectedClass);

            });
            options.input && options.input.blur(function() {
                var me = $(this);
                //本身的显示与隐藏控制;(失去焦点时若输入框内没有内容，则仍然显示输入框，否则隐藏输入框)
                var val = me.val();
                options.inputVal && options.inputVal.text(val);
                if (Boolean(val)) {
                    me.css('display', 'none');

                } else {
                    me.parent().trigger('click');
                }


            });


        },
        star: function(options) {
            var config = {
                    stars: null,
                    //星星标签
                    starDefaultClass: '',
                    //星星默认样式
                    starHoverClass: '',
                    //星星活动样式
                    clickedIndex: -1,
                    input: null,
                    //打分后星星的个数
                    remarkElement: null,
                    //标记元素
                    remark: ['打分', '差评', '中评', '中评', '好评', '好评']
                    //标记字符

                }
                //合并默认配置
            var options = $.extend(true, config, options);
            with(options) {
                stars.hover(function() {
                        //鼠标滑动效果；
                        var me = $(this);
                        var index = me.index();
                        stars.filter(':lt('.concat(index + 1, ')')).removeClass(starDefaultClass).addClass(starHoverClass);
                        //当前元素之前的所有星星全部设置hover样式
                        //设置等级提示标签
                        if (remarkElement) {
                            remarkElement.text(remark[index + 1]);
                        }

                    },
                    function() {
                        stars.removeClass(starHoverClass).addClass(starDefaultClass);
                        //统一恢复默认状态
                        stars.filter(':lt('.concat(clickedIndex + 1, ')')).removeClass(starDefaultClass).addClass(starHoverClass);
                        //统一回复到前一状态
                        //恢复等级提示标签
                        if (remarkElement) {
                            remarkElement.text(remark[clickedIndex + 1]);
                        }

                    });

                stars.click(function() {
                    //鼠标点击效果；
                    var me = $(this);
                    clickedIndex = me.index();
                    //记录点击元素的下标;
                    input.val(clickedIndex + 1);
                    //为了视觉效果，提前鼠标移除效果
                    stars.removeClass(starHoverClass).addClass(starDefaultClass);
                    //统一恢复默认状态
                    stars.filter(':lt('.concat(clickedIndex + 1, ')')).removeClass(starDefaultClass).addClass(starHoverClass);
                    //统一回复到前一状态
                    //设置等级提示标签
                    if (remarkElement) {
                        remarkElement.text(remark[clickedIndex + 1]);
                    }

                });

            }

        },
        toggleShow: function(options) {
            //切换显示和隐藏
            var config = {
                    toggleElement: null,
                    //切换的元素
                    minHeight: 0,
                    //切换元素的最小高度
                    buttonText: ['展开', '收缩'],
                    //切换按钮文字变化，设置buttonLabel的text值
                    buttonLabel: null,
                    //标签容器，起text为buttonText
                    button: null,
                    //是buttonLabel和buttonIco的容器
                    buttonIco: null,
                    //按钮图标容器
                    buttonIcoToggleClass: ''
                    //按钮图标切换样式

                }
                //合并默认配置
            var options = $.extend(true, config, options);
            with(options) {
                button.click(function() {
                    toggleElement.css('height', 'auto');
                    var flag = toggleElement.height() == minHeight;
                    //测试当前元素高度是否为设定最小高度，若是则为隐藏状态，否则为显示状态
                    buttonLabel.text(buttonText[Number(flag)]);
                    //切换按钮标签文字
                    buttonIco.toggleClass(buttonIcoToggleClass, !flag);
                    return false;

                });

            }

        },
        toggleShowElement: function(options) {
            var config = {
                toggleElement: null,
                toggleClass: 'hide',
                button: null,
                buttonLabel: null,
                buttonText: ['展开', '收缩'],
                buttonIco: null,
                buttonIcoToggleClass: ''

            };
            //合并默认配置
            var options = $.extend(true, config, options);
            with(options) {
                button.click(function() {
                    if (!toggleElement.length) {
                        return;
                    };
                    toggleElement.toggleClass(toggleClass);
                    //切换显示和隐藏
                    buttonIco && buttonIco.length && buttonIco.toggleClass(buttonIcoToggleClass);
                    var flag = toggleElement.hasClass(toggleClass);
                    //检测当前是否有隐藏样式
                    buttonLabel && buttonLabel.length && buttonLabel.text(function() {
                        return flag ? buttonText[0] : buttonText[1]
                    });
                    //切换按钮标签文字


                });

            }

        },
        //解析命名空间
        exportSymbol: function(str, value) {
            var obj = window;
            var arr = str.split('.');
            var i = 0,
                ln = arr.length;
            for (i = 0; i < ln; ++i) {
                var name = arr[i];
                if (i + 1 == ln) {
                    obj[name] = value;

                } else {
                    obj[name] = {};
                    obj = obj[name];
                }

            }
            return obj;

        },
        //把一个请求映射为具体的函数(可用来分发事件、传播消息、执行命令)
        //command包含一下属性:object,handler,paragrams,asyn;
        execute: function(command) {
            command.object = command.object ? eval(command.object) : window;
            //object兼容字符串和对象
            if ('function' !== typeof(command.handler) && 'function' !== typeof(command.object[command.handler])) return console.log('必须传入函数名称');
            command.paragrams = command.paragrams || {};
            command.asyn = command.asyn || false;
            if ('function' === typeof(command.handler)) {
                //handler兼容字符串和对象
                command.asyn ? (command.response = command.handler.apply(command.handler, command.paragrams)) : (setTimeout(function() {
                    command.handler.apply(command.handler, command.paragrams)
                }(), 0), command.response = 'ASYN');

            } else {
                !command.asyn ? (command.response = command.object[command.handler].apply(command.object[command.handler], command.paragrams)) : (setTimeout(function() {
                    command.object[command.handler].apply(command.object[command.handler], command.paragrams)
                }(), 0), command.response = 'ASYN');

            }
            return command;

        },
        //标准事件模型接口,实现接口的方法：EventManager.call(this);
        EventManager: function(owner) {
            //事件的所有者
            owner = owner || this;
            //dispatchEvent()方法用来发起事件
            //eventType是事件类型
            //eventArgs是事件参数
            this.dispatchEvent = function(eventTpe, eventArgs) {
                //get the events list
                var events = owner['on'.concat(eventTpe)];
                // if events typeof is function,then transform it to Array;
                if (events && typeof(events) == 'function') {
                    events = [events];
                }
                if (owner && events) {
                    //遍历列表中的事件处理函数，依次调用它们；
                    //事件处理函数是有下面要看到的addEventListener方法注册的
                    for (var i = 0, ln = events.length; i < ln; ++i) {
                        setTimeout(
                            (function(i) {
                                return function() {
                                    events[i](events[i](eventArgs))
                                }
                            })(i), 0
                        )
                    }

                }

            };
            this.addEventListener = function(eventType, closure) {
                if (null == owner['on' + eventType]) {
                    owner['on' + eventType] = [];
                }
                var events = owner['on' + eventType];
                //处理类型兼容简单事件模型注册
                if (events && typeof(events) == 'function') {
                    events = [events];
                }
                events.push(closure);

            };
            this.removeEventListener = function(eventType, closure) {
                var events = owner['on' + eventTye];
                if (events && typeof(events) == 'function') {
                    events = [events];
                }
                //遍历列表，删除相关事件处理函数
                if (events[i] == closure) {
                    events.splice(i, 1);
                }

            }

        },
        //订阅发布模式构造器
        publisher: function(o) {
            if (!(o instanceof Object)) {
                o = {};
            }
            //如果o不是对象，则创建对象
            o.subscribers = {
                any: []
            };
            //envent type:subscribers
            o.subscribe = function(fn, type) {
                //订阅方法
                type = type || 'any';
                o.subscribers[type] = o.subscribers[type] || [];
                o.subscribers[type].push(fn);

            }
            o.unsubscribe = function(data, type) {
                o.visitSubscribers('unsubscribe', fn, type);
            };
            o.publish = function(data, type) {
                o.visitSubscribers('publish', data, type);
            };
            o.visitSubscribers = function(action, arg, type) {
                //action,为pubulish时，arg为参数，循环调用相关type类型的所有函数  action为unsubscribe时，arg为function，删除相关函数
                var type = type || 'any',
                    subscribers = o.subscribers[type];
                for (var i = 0, ln = subscribers.length; i < ln; ++i) {
                    'publish' == action ? (subscribers[i](arg)) : arg === subscribers[i] ? subscribers.splice(i, 1) : '';

                }

            }

        },
        //在线客服 悬浮控制
        OnlineServiceFixedController: function(options) {
            var config = {
                online_service: null, //在线客服 JQuery 对象
                fixed_offsetX: null, //悬浮 X 轴 参考坐标值。
                fixed_reference_left_spacing: 15, //悬浮 相对于 fixed_offsetX 的距离。 单位为 px
                fixed_default_position_right: 10, //悬浮 默认的 position_right。 单位为 px
                timer_max_size: 60, //定时器最大触发次数
                timer_run_count: 0, //定时器已经运行的次数
                online_service_style: {
                    "display": "block",
                    "position": "fixed",
                    "z-index": "1000000",
                    "top": "60px"
                }
            };

            var options = $.extend(true, config, options || {});

            if(options.fixed_position_x_element.length <= 0){
                return;
            }
            //更新悬浮菜单 x 参考坐标
            options.updateReferenceCoordinate = function() {
                var reference_element_offsetX = options.fixed_position_x_element.offset().left;
                var reference_element_outer_width = options.fixed_position_x_element.outerWidth();
                options.fixed_offserX = reference_element_offsetX + reference_element_outer_width;
            };
            //更改浮动菜单左侧偏移位置
            options.fixedPositionLeftChange = function() {
                if (!options.fixed_offserX && options.online_service.length == 0) {
                    return false;
                }

                var window_width = $(window).width();
                var fixed_width = options.online_service.outerWidth();
                var fixed_position_left = options.fixed_offserX + options.fixed_reference_left_spacing;

                if (window_width > (fixed_position_left + fixed_width)) {

                    options.online_service.removeAttr("style").css(options.online_service_style);
                    options.online_service.css("left", fixed_position_left);
                } else {

                    options.online_service.removeAttr("style").css(options.online_service_style);
                    options.online_service.css("right", options.fixed_default_position_right);

                }
            };

            setTimeout(function() {
                if (options.timer_run_count > options.timer_max_size) {
                    return false;
                }

                var online_service = $(options.online_service_id);
                //判断时候已加载
                if (online_service.length == 0) {
                    options.timer_run_count += 1;
                    setTimeout(arguments.callee, 500);
                    return false;
                }

                options.online_service = online_service;

                options.updateReferenceCoordinate();
                //当窗口改变时重新定位悬浮菜单
                $(window).resize(function() {
                    options.updateReferenceCoordinate();
                    options.fixedPositionLeftChange();
                });

                setTimeout(options.fixedPositionLeftChange, 500);

            }, 500);

        },
        SearchPrompt: function(options) {
            var config = {
                search_input: null, //搜索 input]
                search_prompt: null, //搜索提示
                search_prompt_html: '<label for="keyword" class="search-prompt">prompt_info</label>', //搜索提示
                search_prompt_css: {
                    "position": "absolute",
                    "color": "#9c9c9c",
                    "top": "11px",
                    "left": "15px",
                    "cursor": "text"
                }
            };
            var options = $.extend(true, config, options || {});
            options.search_prompt_html = options.search_prompt_html.replace(/prompt_info/, options.prompt_info);

            options.search_input = options.search.find('input');
            options.search.css("position", "relative");

            //添加 label 搜索提示，设置样式
            options.search.append(options.search_prompt_html).find('label').css(options.search_prompt_css);
            options.search_prompt = options.search.find('label');
            for (var search_length = options.search_input.length; search_length > 0; search_length--) {
                var callback = (function() {
                    var index = search_length - 1;
                    return function() {
                        if ($(this).val()) {
                            options.search_prompt.eq(index).css("display", "none");
                        } else {
                            options.search_prompt.eq(index).css("display", "block");
                        }
                    };
                })();
                options.search_input.eq(search_length - 1).keyup(callback);
                options.search_prompt.eq(search_length - 1).click(function() {
                    $(this).siblings('input').focus();
                });

            }

        }

    });

    //添加到jquery element上的ui效果组件;
    $.fn.extend({
        setPosition: function(options) {
            //定位函数
            var me = $(this);
            var config = {
                    positionWay: 'fixed',
                    position: {
                        left: 0.5,
                        top: 0.5
                    },
                    zIndex: 9999,
                    modal: true,
                    opacity: 0.3,
                    autoShow: true,
                    parent: $('body')

                }
                //合并默认配置
            var options = $.extend(true, config, options);
            var win = $(window);
            var maxHeight = win.height();
            var maxWidth = win.width();
            //获取已经存在的遮罩层（默认假设已经存在）
            var modal = $('#my-modal-exist');
            //判断是否生成遮罩
            if (options.modal && !modal.length) {
                //options.modal为true,并且modal不存在则生成遮罩
                var modal = $('<div id="my-modal-exist"></div>');
                modal.css({
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    background: '#000',
                    opacity: options.opacity,
                    'z-index': options.zIndex - 1
                    //比内容层第低一层

                });
                options.parent.append(modal);

            }
            me.add(modal).css('display', options.autoShow ? 'block' : 'none');
            var width = me.width() || me.children(':first').width();
            var height = me.height()
            if (!height) {
                me.children.each(function() {
                    height += $(this).outerHeight(true);
                });

            }

            if (options.position.left < 1) {
                //将百分比转换相对中心对齐
                options.position.left -= width / (2 * maxWidth);

            }
            if (options.position.top < 1) {
                //将百分比转换相对中心对齐
                options.position.top -= height / (2 * maxHeight);

            }
            //console.log(options.position);
            //对当前元素设定固定定位
            me.css({
                position: options.positionWay,
                'z-index': options.zIndex,
                left: options.position.left < 1 ? options.position.left * maxWidth.toFixed(1) : options.position.left,
                top: options.position.top < 1 ? options.position.top * maxHeight.toFixed(1) : options.position.top

            });

        },
        pop: function(options) {
            var options = options || {};
            options.container = $(this);
            $.pop(options);

        },
        testWords: function(options) {
            var options = options || {};
            var me = $(this);
            options.container = me;
            options.textarea = $('textarea', me);
            $.testWords(options);

        },
        multiSelect: function(options) {
            var options = options || {};
            var me = $(this);
            options.container = me;
            options.labels = options.labels || me.find('label');
            $.multiSelect(options);

        },
        SimulationSelect: function(options) {
            var options = options || {};
            $(this).each(function(index, element) {
                options.container = $(this);
                $.SimulationSelect(options);
            });;

        }

    });


});




$(function() {
    $.extend({
        leftBanner: function(options){
            var config = {
            };
            var options = $.extend(true, config, options);
            if(options.bannerContains.length !== 1) return;
            function resizeBanner() {
                var pageWidth = $(window).width();
                var bannerWidth = options.bannerContains.width();
                
                var remainWidth = (pageWidth - options.contentWidth)/2;
                if(remainWidth < bannerWidth){
                    options.bannerContains.hide();
                    return;
                }
                options.bannerContains.show();
                options.bannerContains.css('left', remainWidth - bannerWidth);
                options.bannerContains.find('.close').click(function(){
                    options.bannerContains.remove();
                });
            };
            $(window).resize(resizeBanner);
            resizeBanner();
        }
    });
});