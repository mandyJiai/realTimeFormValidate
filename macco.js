(function ($) {
    $.fn.extend({
        validate: function (options) {
            this.attr("novalidate", "novalidate");
            validator = new $.validator(options, this[0]);
            $.validator.eachInput();
            $.validator.log();
            $("button[type= 'submit']").click(function () {
                var errorArray = new Array();
                $("input,textarea").each(function () {
                    var element = $(this);
                    var vailInput = element.attr("macco-vail-input");
                    if (vailInput == "true") {
                        if (document.all) {
                            // 如果浏览器是IE
                            $.validator.log();
                            var value = element.attr("value");
                            var hint = element.attr("placeholder");
                            if (value == hint) {
                                $.validator.defaultShowError("", element);
                            } else {
                                $.validator.defaultShowError(value, element);
                            }
                            var errorLabel = element.attr("macco-error-label");
                            var html = $(errorLabel).html();
                            if (html == "") {
                                errorArray.push("1");
                            } else {
                                errorArray.push("0");
                            }
                        } else {
                            // 如果浏览器不是IE
                            var value = element.attr("value");
                            $.validator.defaultShowError(value, element);
                            var errorLabel = element.attr("macco-error-label");
                            var html = $(errorLabel).html();
                            if (html == "") {
                                errorArray.push("1");
                            } else {
                                errorArray.push("0");
                            }
                        }
                    }
                });
                var errorLength = errorArray.length;
                var count = 0;
                $.each(errorArray, function (n, value) {
                    if (value == 0) {
                        return false;
                    } else {
                        count++;
                    }
                });
                if (count == errorLength) {
                    alert("验证成功");
                } else {
                    alert("验证不成功");
                      return false;
                }
                console.log("count:" + count);
                return false;
            });
        }
    });

    $.validator = function (options) {
    };

    $.extend(String.prototype, {
        trim: function () {
            return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
        }
    });

    $.extend($.validator, {
        eachInput: function () {
            $("input,textarea").each(function () {
                var element = $(this);
                var vailInput = element.attr("macco-vail-input");
                if (vailInput == "true") {
                    if (document.all) {
                        // 如果浏览器是IE
                        $.validator.log();
                        $.validator.initIe(element);
                    } else {
                        // 如果浏览器不是IE
                        $.validator.initNotIe(element);
                    }
                }
            });
        },


       // 遍历每一个input
        initNotIe: function (element) {
            $.validator.enterPress(element);
            $.validator.onfocusNotIe(element);
            $.validator.onblurNotIe(element);
        },

        // For IE 提示语放在这儿
        initIe: function (element) {
            var hint = element.attr("placeholder");
            if (hint != undefined) {
                element.attr("value", hint);
                element.css("color", "#bbbbbb");
            }
            $.validator.enterPress(element);
            $.validator.onfocusIe(hint, element);
            $.validator.onblurIe(hint, element);
        },

        enterPress: function (element) {
            element.keypress(function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                }
            });
        },
        // 文本框聚焦时他，提示语消失
        onfocusIe: function (hint, element) {
            element.focus(function () {
                var currentValue = element.attr("value");
                if (hint == currentValue) {
                    element.attr("value", "");
                    var value = "";
                } else {
                    var value = currentValue;
                }
                element.css("color", "#666666");
                $.validator.defaultShowError(value, element);
            });

        },

        // 文本框聚焦时他，提示语消失
        onblurIe: function (hint, element) {
            element.blur(function () {
                // $.validator.methods.required(value,element);				
            });
        },


        // 文本框聚焦时他，提示语消失
        onfocusNotIe: function (element) {
            element.focus(function () {
                element.attr("placeholder", "");
                var value = element.attr("value");
                $.validator.defaultShowError(value, element);
            });

        },

        // 文本框聚焦时他，提示语消失
        onblurNotIe: function (element) {
            element.blur(function () {
            });
        },

        defaultShowError: function (value, element) {
            $.validator.methods.required(value, element);
            $.validator.methods.ajax(element);
            $.validator.methods.number(element);
            $.validator.methods.maxlength(element);
            $.validator.methods.minlength(element);
            $.validator.methods.email(element);
            $.validator.methods.url(element);
            $.validator.methods.phone(element);
            $.validator.methods.confirmPassword(element);
            $.validator.addMethod(element);
            $.validator.methods.checkbox();
            $.validator.methods.radio();
            $.validator.methods.textselect();
        },

        log: function () {
            var a = window.console, b = arguments;
            if (a && a.log) {
                a.log.apply ? a.log.apply(a, b) : a.log(b);
            }
        },

        addMethod: function (element) {
            var isAddMethod = element.attr("macco-vail-addMethod");
            if (isAddMethod == "true") {
                var addMethodName = element.attr("macco-addMethod-name");
                if (addMethodName == "" || addMethodName == undefined) {

                } else {
                    var isValiName = element.attr("macco-vail-" + addMethodName);
                    var errorLabel = element.attr("macco-error-label");
                    var str = element.attr("macco-" + addMethodName + "-regex");
                    var reg = eval(str);
                    var nameTip = element.attr("macco-" + addMethodName + "-tip");
                    $.validator.methods['' + addMethodName + ''] = function () {
                        if (isValiName == "true") {
                            element.bind('input propertychange keyup', function () {
                                var value = element.attr("value").trim();
                                var isValidata = reg.test(value);
                                if (value == "") {

                                } else {
                                    if (isValidata == true) {

                                    } else {
                                        if (nameTip == "" || nameTip == undefined) {

                                        } else {
                                            $(errorLabel).html(nameTip);
                                        }
                                    }
                                }

                            });

                        }
                    }
                    $.validator.methods['' + addMethodName + '']();
                }
            } else {
            }
        },

        eachDiv: function (callback) {
            $("div").each(function () {
                var element = $(this);
                callback(element);
            });
        },

        selectresult: function (element) {
            var requiredTip = $.validator.message.required;
            element.find("div").each(function () {
                if ($(this).attr("macco-select-result")) {
                    $(this).click(function () {
                        element.find("div").each(function () {
                            if ($(this).attr("macco-select-content")) {
                                var flag = $(this).attr("macco-select-content");
                                var hasErrorLabel = element.attr("macco-error-label");
                                if (flag == "true") {
                                    $(this).show();
                                    $(this).attr("macco-select-content", "false");
                                    $(hasErrorLabel).html('');
                                }
                                if (flag == "false") {
                                    $(this).hide();
                                    $(this).attr("macco-select-content", "true");
                                    element.find("div").each(function () {
                                        if ($(this).attr("macco-select-result") && $(this).val() == '') {
                                            $(hasErrorLabel).html(requiredTip);
                                        }
                                    });
                                }
                            }
                        });
                    });
                }
            });
        },

        // 错误提示信息
        message: {
            required: "*此项为必填项",
            max: "*最大长度不能超过",
            min: "*最小长度不能少于",
            email: "*email格式不正确",
            phone: "*电话号码格式不正确",
            url: "*url格式不正确",
            number: "*数字格式不正确",
            confirmPassword: "*两次输入密码不一致",
        },

        // 有效的方法
        methods: {
            required: function (value, element) {
                var isMaccoRequired = element.attr("macco-required");
                if (isMaccoRequired == "true") {
                    var errorTip = element.attr("macco-required-tip");
                    var errorLabel = element.attr("macco-error-label");
                    if (errorTip == "" || errorTip == undefined) {
                        var requiredTip = $.validator.message.required;
                    } else {
                        var requiredTip = errorTip;
                    }
                    if (value == "") {
                        $(errorLabel).html(requiredTip);
                    }
                    element.bind('input propertychange keyup', function () {
                        var value = element.attr("value").trim();
                        if (value == "") {
                            $(errorLabel).html(requiredTip);
                        } else {
                            $(errorLabel).html("");
                        }
                    });
                } else {
                    if (value == "" || value == undefined) {
                        var errorLabel = element.attr("macco-error-label");
                        $(errorLabel).html("");
                    } else {

                    }
                }
            },

            number: function (element) {
                var isMaccoRequired = element.attr("macco-required");
                var hasVailNumber = element.attr("macco-vail-number");
                if (hasVailNumber == "true") {
                    var errorTip = element.attr("macco-number-tip");
                    var errorLabel = element.attr("macco-error-label");
                    if (errorTip == "" || errorTip == undefined) {
                        var numberTip = $.validator.message.number;
                    } else {
                        var numberTip = errorTip;
                    }
                    element.bind('input propertychange keyup', function () {
                        var value = element.attr("value").trim();
                        var number = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
                        var isValidata = number.test(value);
                        if (value == "" && isMaccoRequired != "true") {
                            $(errorLabel).html("");
                        } else if (value == "" && isMaccoRequired == "true") {

                        } else {
                            if (isValidata == true) {
                                $(errorLabel).html("");
                            } else {
                                $(errorLabel).html(numberTip);
                            }
                        }
                    });
                }
            },

            maxlength: function (element) {
                var isMaccoRequired = element.attr("macco-required");
                var hasMax = element.attr("macco-vail-max");
                var MaxValue = parseInt(hasMax);
                if (hasMax != "undefined") {
                    element.bind('input propertychange keyup', function () {
                        var value = element.attr("value").trim();
                        var valueLength = value.length;
                        if (valueLength == 0 && isMaccoRequired != "true") {
                            $(errorLabel).html("");
                        } else if (valueLength == 0 && isMaccoRequired == "true") {

                        } else if (valueLength > MaxValue) {
                            var errorTip = element.attr("macco-max-tip");
                            var errorLabel = element.attr("macco-error-label");
                            if (errorTip == "" || errorTip == undefined) {
                                var maxTip = $.validator.message.max + MaxValue;
                            } else {
                                var maxTip = errorTip;
                            }
                            $(errorLabel).html(maxTip);
                        } else {
                        }
                    });
                }
            },

            minlength: function (element) {
                var isMaccoRequired = element.attr("macco-required");
                var hasMin = element.attr("macco-vail-min");
                var MinValue = parseInt(hasMin);
                if (hasMin != "undefined") {
                    element.bind('input propertychange keyup', function () {
                        var value = element.attr("value").trim();
                        var valueLength = value.length;
                        if (valueLength == 0 && isMaccoRequired != "true") {
                            $(errorLabel).html("");
                        } else if (valueLength == 0 && isMaccoRequired == "true") {

                        } else if (valueLength < MinValue) {
                            var errorTip = element.attr("macco-min-tip");
                            var errorLabel = element.attr("macco-error-label");
                            if (errorTip == "" || errorTip == undefined) {
                                var minTip = $.validator.message.min + MinValue;
                            } else {
                                var minTip = errorTip;
                            }
                            $(errorLabel).html(minTip);
                        } else {
                        }
                    });
                }
            },

            email: function (element) {
                var isMaccoRequired = element.attr("macco-required");
                var hasEmail = element.attr("macco-vail-email");
                if (hasEmail == "true") {
                    element.bind('input propertychange keyup', function () {
                        var value = element.attr("value").trim();
                        var email = /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/;
                        var isValidata = email.test(value);
                        if (value == "" && isMaccoRequired != "true") {
                            $(errorLabel).html("");
                        } else if (value == "" && isMaccoRequired == "true") {

                        } else {
                            if (isValidata == true) {
                            } else {
                                var errorTip = element.attr("macco-email-tip");
                                var errorLabel = element.attr("macco-error-label");
                                if (errorTip == "" || errorTip == undefined) {
                                    var emailTip = $.validator.message.email;
                                } else {
                                    var emailTip = errorTip;
                                }
                                $(errorLabel).html(emailTip);
                            }
                        }
                    });
                }
            },

            url: function (element) {
                var isMaccoRequired = element.attr("macco-required");
                var hasUrl = element.attr("macco-vail-url");
                if (hasUrl == "true") {
                    element.bind('input propertychange keyup', function () {
                        var value = element.attr("value").trim();
                        var url = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
                        var isValidata = url.test(value);
                        if (value == "" && isMaccoRequired != "true") {
                            $(errorLabel).html("");
                        } else if (value == "" && isMaccoRequired == "true") {

                        } else {
                            if (isValidata == true) {
                            } else {
                                var errorTip = element.attr("macco-url-tip");
                                var errorLabel = element.attr("macco-error-label");
                                if (errorTip == "" || errorTip == undefined) {
                                    var urlTip = $.validator.message.url;
                                } else {
                                    var urlTip = errorTip;
                                }
                                $(errorLabel).html(urlTip);
                            }
                        }
                    });
                }
            },

            phone: function (element) {
                var isMaccoRequired = element.attr("macco-required");
                var hasPhone = element.attr("macco-vail-phone");
                if (hasPhone == "true") {
                    element.bind('input propertychange keyup', function () {
                        var value = element.attr("value").trim();
                        var mobile = /^1[3|4|5|7|8]\d{9}$/;
                        var isValidata = mobile.test(value);
                        if (value == "" && isMaccoRequired != "true") {
                            $(errorLabel).html("");
                        } else if (value == "" && isMaccoRequired == "true") {

                        } else {
                            if (isValidata == true) {
                            } else {
                                var errorTip = element.attr("macco-phone-tip");
                                var errorLabel = element.attr("macco-error-label");
                                if (errorTip == "" || errorTip == undefined) {
                                    var phoneTip = $.validator.message.phone;
                                } else {
                                    var phoneTip = errorTip;
                                }
                                $(errorLabel).html(phoneTip);
                            }
                        }
                    });
                }
            },

            confirmPassword: function (element) {
                var isMaccoRequired = element.attr("macco-required");
                var hasConfirmPassword = element.attr("macco-vail-confirmPassword");
                if (hasConfirmPassword == "true") {
                    var errorLabel;
                    var equalTo = element.attr("macco-equalTo");
                    var password = $("input[name=" + equalTo + "]").attr("value");
                    element.bind('input propertychange keyup', function () {
                        var confirmPassword = element.attr("value");
                        if (confirmPassword == "" && isMaccoRequired != "true") {
                            $(errorLabel).html("");
                        } else if (confirmPassword == "" && isMaccoRequired == "true") {

                        } else {
                            if (password == confirmPassword) {

                            } else {
                                var errorTip = element.attr("macco-confirmPassword-tip");
                                errorLabel = element.attr("macco-error-label");
                                if (errorTip == "" || errorTip == undefined) {
                                    var confirmPasswordTip = $.validator.message.confirmPassword;
                                } else {
                                    var confirmPasswordTip = errorTip;
                                }
                                $(errorLabel).html(confirmPasswordTip);
                                $(errorLabel).hide();
                            }
                        }
                    });
                    element.blur(function () {
                        $(errorLabel).show();
                    });
                }
            },

            ajax: function (element) {
                var isMaccoRequired = element.attr("macco-required");
                var hasAjax = element.attr("macco-vail-ajax");
                if (hasAjax == "true") {
                    element.bind('input propertychange keyup', function () {
                        var value = element.attr("value").trim();
                        if (value == "" && isMaccoRequired != "true") {
                            $(errorLabel).html("");
                        } else if (value == "" && isMaccoRequired == "true") {

                        } else {
                            var request = $.ajax({
                                type: "post",
                                url: "ajax/ajax2.aspx/test1",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                async: true,
                                data: "{value:'" + value + "','username':[{'name':'m'},{'name':'lily'},{'name':'小明'}]}", //这里的value和username必须和后台方法定义的变量名一致
                                success: function (result) {
                                    if (result.d == "false") {
                                        var errorLabel = element.attr("macco-error-label");
                                        var ajaxTip = element.attr("macco-ajax-tip");
                                        if (ajaxTip != undefined && ajaxTip != "") {
                                            $(errorLabel).html(ajaxTip);
                                        }
                                        return false;
                                    } else {
                                        var errorLabel = element.attr("macco-error-label");
                                        $(errorLabel).html("");
                                    }
                                },
                                error: function (msg) { alert(msg.responseText); }  //ajax后台方法失败的异常错误信息
                            });

                        }
                    });
                }
            },

            radio: function () {
                $("input[type='radio']").click(function () {
                    var count = 0;
                    $(this).parent().parent().find("input[type='radio']").each(function () {
                        if ($(this).is(':checked')) {
                            count++;
                        }
                    });
                    if (count == 1) {
                        $(this).parent().parent().next(".maccoError").hide();
                    }
                    else {
                        $(this).parent().parent().next(".maccoError").show();
                    }
                });
            },

            checkbox: function () {
                $("input[type='checkbox']").click(function () {
                    var count = 0;
                    $(this).parent().parent().find("input[type='checkbox']").each(function () {
                        if ($(this).is(':checked')) {
                            count++;
                        }
                    });
                    if (count >= 1) {
                        $(this).parent().parent().next(".maccoError").hide();
                    }
                    else {
                        $(this).parent().parent().next(".maccoError").show();
                    }
                });
            },

            textselect: function () {
                var requiredTip = $.validator.message.required;
                $.validator.eachDiv(function (element) {
                    var hasSelect = element.attr("macco-select");
                    if (hasSelect == "true") {
                        $.validator.selectresult(element);
                    }

                    if (hasSelect == "false") {
                        var hasErrorLabel = element.attr("macco-error-label");
                        $(hasErrorLabel).html(requiredTip);
                    }
                });
            },

        }

    });
}(jQuery));
