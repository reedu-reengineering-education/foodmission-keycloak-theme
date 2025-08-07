<#import "template.ftl" as layout>
<@layout.mainLayout active='password' bodyClass='password'; section>

    <#if section = "header">
        <h2>${msg("changePasswordHtmlTitle")}</h2>
    <#elseif section = "content">

        <form action="${url.passwordUrl}" class="form-horizontal" method="post">
            <input type="hidden" id="stateChecker" name="stateChecker" value="${stateChecker}">

            <#if password.passwordSet>
                <div class="form-group">
                    <div class="col-sm-2 col-md-2">
                        <label for="password" class="control-label">${msg("password")}</label>
                    </div>

                    <div class="col-sm-10 col-md-10">
                        <input type="password" class="form-control" id="password" name="password" autofocus autocomplete="current-password">
                    </div>
                </div>
            </#if>

            <input type="hidden" id="stateChecker" name="stateChecker" value="${stateChecker}">

            <div class="form-group">
                <div class="col-sm-2 col-md-2">
                    <label for="password-new" class="control-label">${msg("passwordNew")}</label>
                </div>

                <div class="col-sm-10 col-md-10">
                    <input type="password" class="form-control" id="password-new" name="password-new" autocomplete="new-password">
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-2 col-md-2">
                    <label for="password-confirm" class="control-label" class="two-lines">${msg("passwordConfirm")}</label>
                </div>

                <div class="col-sm-10 col-md-10">
                    <input type="password" class="form-control" id="password-confirm" name="password-confirm" autocomplete="new-password">
                </div>
            </div>

            <div class="form-group">
                <div id="kc-form-buttons" class="col-md-offset-2 col-md-10 submit">
                    <div class="">
                        <#if url.referrerURI??><a href="${url.referrerURI}">${kcSanitize(msg("backToApplication"))?no_esc}</a></#if>
                        <button type="submit" class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!}" name="submitAction" value="Save">${msg("doSave")}</button>
                        <button type="submit" class="${properties.kcButtonClass!} ${properties.kcButtonDefaultClass!} ${properties.kcButtonLargeClass!}" name="submitAction" value="Cancel">${msg("doCancel")}</button>
                    </div>
                </div>
            </div>
        </form>

    </#if>
</@layout.mainLayout>