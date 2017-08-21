import ellipsis from 'text-ellipsis';

export default {
  bubble: ({imageUrl, dateText, ownerDisplayName, description}) => `
    ${imageUrl ? `<img class="banner" src="${imageUrl}" />` : ''}
    <div class="separator"></div>
    <div class="row tcenter">
      <span class="col2 date">${dateText || ''}</span>
      <span class="col2 author">${ownerDisplayName || ''}</span>
    </div>
    <div class="separator"></div>
    <pre class="description">${description ? ellipsis(description, 450) : ''}</pre>
    <div class="logo tcenter">
      <i class="fa fa-globe" aria-hidden="true"></i>
    </div>
    <div class="copyright tcenter">Geographical Memories @ 2017</div>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 600px;
      font-family: 'Helvetica', Arial, sans-serif;
    }

    .separator {
      margin-top: 15px;
      border-top: 1px solid #ddd;
      margin-bottom: 15px;
    }

    .row:after {
      display: block;
      content: '';
      clear: both;
    }

    .col2 {
      width: 50%;
      float: left;
    }

    .tcenter {
      text-align: center;
    }

    .inline > * {
      flex: 1;
    }

    .banner {
      width: 100%;
      max-height: 420px;
    }

    .date {
      display: block;
    }

    pre.description {
      font-family: inherit;
      text-align: justify;
      text-justify: inter-word;
      white-space: pre-wrap;
    }

    .logo {
      color: #4386fc;
    }

    .copyright {
      margin-top: 10px;
      font-size: 0.8em;
    }
    </style>
  `,
};
