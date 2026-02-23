/**
 * Google Apps Script Web App for AI Workflow Automate contact form.
 * Sends email from the authenticated Gmail account to sjshirolkar@gmail.com.
 */
function doPost(e) {
  try {
    var payload = extractPayload(e);

    var name = (payload.name || '').trim();
    var senderEmail = (payload.email || '').trim();
    var message = (payload.message || '').trim();
    var projectFocus = (payload.project_focus || 'General Inquiry').trim();
    var inquirySource = (payload.inquiry_source || 'Website Form').trim();

    if (!name || !senderEmail || !message) {
      return jsonResponse({ ok: false, error: 'Name, email, and message are required.' }, 400);
    }

    var to = 'sjshirolkar@gmail.com';
    var subject = 'New Website Enquiry: ' + projectFocus;

    var body = [
      'New enquiry from aiworkflowautomate.com',
      '',
      'Name: ' + name,
      'Email: ' + senderEmail,
      'Source: ' + inquirySource,
      'Project Focus: ' + projectFocus,
      '',
      'Message:',
      message
    ].join('\n');

    GmailApp.sendEmail(to, subject, body, {
      replyTo: senderEmail,
      name: 'AI Workflow Automate Website'
    });

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

function extractPayload(e) {
  var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '';
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (jsonErr) {
      // Continue and try form-encoded params.
    }
  }

  var params = (e && e.parameter) ? e.parameter : {};
  return {
    name: params.name || '',
    email: params.email || '',
    message: params.message || '',
    project_focus: params.project_focus || 'General Inquiry',
    inquiry_source: params.inquiry_source || 'Website Form'
  };
}

function jsonResponse(obj, statusCode) {
  var output = ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);

  // Apps Script doesn't expose direct status setters in ContentService for web apps.
  // Response body includes ok/error and client checks HTTP success.
  return output;
}
