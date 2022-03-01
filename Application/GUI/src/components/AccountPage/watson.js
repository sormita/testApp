  window.watsonAssistantChatOptions = {
      integrationID: "3d4f839f-e9f3-4aa3-b3c2-41542f55181d", // The ID of this integration.
      region: "us-south", // The region your integration is hosted in.
      serviceInstanceID: "fe3ab7e7-796b-4d56-93e1-c0d158eea155", // The ID of your service instance.
      onLoad: function(instance) { instance.render(); }
    };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
    document.head.appendChild(t);
  });
