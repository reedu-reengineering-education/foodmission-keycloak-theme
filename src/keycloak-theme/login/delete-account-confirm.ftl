<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('password') displayInfo=false; section>
    <#if section = "header">
        ${msg("deleteAccountConfirm")}
    <#elseif section = "form">
    <div id="kc-form">
      <div id="kc-form-wrapper">
        <div class="${properties.kcFormGroupClass!}">
            <div class="alert alert-warning" role="alert">
                <span class="${properties.kcFeedbackWarningIcon!}"></span>
                <span class="kc-feedback-text">${msg("deleteAccountWarning")}</span>
            </div>
        </div>

        <form id="kc-delete-account-form" action="${url.loginAction}" method="post">
            <div class="${properties.kcFormGroupClass!}">
                <label for="password" class="${properties.kcLabelClass!}">${msg("password")}</label>
                <input tabindex="1" id="password" class="${properties.kcInputClass!}" name="password" type="password" autocomplete="current-password" autofocus
                       aria-invalid="<#if messagesPerField.existsError('password')>true</#if>"
                />
                <#if messagesPerField.existsError('password')>
                    <span id="input-error-password" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                        ${kcSanitize(messagesPerField.getFirstError('password'))?no_esc}
                    </span>
                </#if>
            </div>

            <div class="${properties.kcFormGroupClass!}">
                <div class="checkbox">
                    <label>
                        <input tabindex="2" id="delete-account-confirm" name="delete-account-confirm" type="checkbox" required> 
                        ${msg("deleteAccountConfirmCheckbox")}
                    </label>
                </div>
            </div>

            <div id="kc-form-buttons" class="${properties.kcFormGroupClass!}">
                <input tabindex="3" class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" 
                       name="submitAction" id="kc-delete-account" type="submit" value="${msg("doDeleteAccount")}"/>
                <button tabindex="4" class="${properties.kcButtonClass!} ${properties.kcButtonDefaultClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" 
                        type="button" onclick="history.back()">${msg("doCancel")}</button>
            </div>
        </form>
      </div>
    </div>
    </#if>
</@layout.registrationLayout>