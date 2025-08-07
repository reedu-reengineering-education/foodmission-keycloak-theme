<#macro mainLayout active bodyClass="">
<!DOCTYPE html>
<html class="${properties.kcHtmlClass!}"<#if realm.internationalizationEnabled> lang="${locale.currentLanguageTag}"</#if>>

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>${msg("accountManagementTitle")} - ${realm.displayName!""}</title>
    
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
    
    <#if properties.stylesCommon?has_content>
        <#list properties.stylesCommon?split(' ') as style>
            <link href="${url.resourcesCommonPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    
    <#if properties.scripts?has_content>
        <#list properties.scripts?split(' ') as script>
            <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
        </#list>
    </#if>
</head>

<body class="${properties.kcBodyClass!} ${bodyClass}">
    <div id="root"></div>
    
    <script>
        window.kcContext = {
            pageId: "${.template_name}",
            realm: {
                displayName: "${realm.displayName!""}",
                displayNameHtml: "${realm.displayNameHtml!""}",
                internationalizationEnabled: ${realm.internationalizationEnabled?c},
                accountTheme: "${realm.accountTheme!""}",
            },
            account: {
                <#if account??>
                username: "${account.username!""}",
                email: "${account.email!""}",
                firstName: "${account.firstName!""}",
                lastName: "${account.lastName!""}",
                </#if>
            },
            url: {
                accountUrl: "${url.accountUrl}",
                passwordUrl: "${url.passwordUrl}",
                <#if url.logoutUrl??>
                logoutUrl: "${url.logoutUrl}",
                </#if>
                resourcesPath: "${url.resourcesPath}",
                resourcesCommonPath: "${url.resourcesCommonPath}",
            },
            <#if message??>
            message: {
                type: "${message.type}",
                summary: "${kcSanitize(message.summary)?no_esc}",
            },
            </#if>
            themeName: "foodmission",
            properties: {
                projectName: "${properties.projectName!"FOODMISSION"}",
                projectDescription: "${properties.projectDescription!"EU-funded citizen science project"}",
                supportEmail: "${properties.supportEmail!"support@foodmission.eu"}",
                privacyPolicyUrl: "${properties.privacyPolicyUrl!""}",
                termsOfServiceUrl: "${properties.termsOfServiceUrl!""}",
                logoUrl: "${properties.logoUrl!""}",
            },
            <#if locale??>
            locale: {
                currentLanguageTag: "${locale.currentLanguageTag}",
                supported: [
                    <#list locale.supported as l>
                    {
                        languageTag: "${l.languageTag}",
                        label: "${l.label}",
                        url: "${l.url}"
                    }<#if l_has_next>,</#if>
                    </#list>
                ]
            },
            </#if>
        };
    </script>
</body>
</html>
</#macro>