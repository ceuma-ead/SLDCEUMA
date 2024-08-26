window.onload = () => {
    window.ui = SwaggerUIBundle({
      url: '../doc/documentation.json',
      dom_id: '#swagger-ui',
    });
  };