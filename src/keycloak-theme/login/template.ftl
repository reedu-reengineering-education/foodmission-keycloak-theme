<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false>
<!DOCTYPE html>
<html class="${properties.kcHtmlClass!}"<#if realm.internationalizationEnabled> lang="${locale.currentLanguageTag}"</#if>>

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
        </#list>
    </#if>
    
    <title>${msg("loginTitle",(realm.displayName!""))}</title>
    
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
    
    <#if scripts??>
        <#list scripts as script>
            <script src="${script}" type="text/javascript"></script>
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
                loginTheme: "${realm.loginTheme!""}",
                <#if realm.password>
                password: true,
                </#if>
            },
            client: {
                clientId: "${client.clientId!""}",
                name: "${client.name!""}",
                <#if client.description??>
                description: "${client.description}",
                </#if>
            },
            url: {
                loginAction: "${url.loginAction}",
                <#if url.loginRestartFlowUrl??>
                loginRestartFlowUrl: "${url.loginRestartFlowUrl}",
                </#if>
                <#if url.registrationUrl??>
                registrationUrl: "${url.registrationUrl}",
                </#if>
                resourcesPath: "${url.resourcesPath}",
                resourcesCommonPath: "${url.resourcesCommonPath}",
            },
            <#if login??>
            login: {
                <#if login.username??>
                username: "${login.username}",
                </#if>
                <#if login.rememberMe??>
                rememberMe: ${login.rememberMe?c},
                </#if>
            },
            </#if>
            <#if message??>
            message: {
                type: "${message.type}",
                summary: "${kcSanitize(message.summary)?no_esc}",
            },
            </#if>
            <#if messagesPerField??>
            messagesPerField: {
                <#list messagesPerField.fieldNames as field>
                "${field}": [
                    <#list messagesPerField.get(field) as msg>
                    "${kcSanitize(msg)?no_esc}"<#if msg_has_next>,</#if>
                    </#list>
                ]<#if field_has_next>,</#if>
                </#list>
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