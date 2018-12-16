
import VeeValidate,{ Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Validator.localize("zh_CN", zh_CN);
Validator.extend('phone', {
    messages: {
        zh_CN: () => '请输入正确的手机格式',
    },
    validate: value => {
        return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
});
let dictionary = {
    locale: 'zh_CN',
    dictionary: {
        zh_CN: {
            messages: {
                email: () => '请输入正确的邮箱格式',
                required: (field) => "请输入" + field
            },
            attributes: {
                email: '邮箱',
                phone: '手机',
                captcha: '验证码'
            }
        }
    }
}
export default VeeValidate
export { dictionary }