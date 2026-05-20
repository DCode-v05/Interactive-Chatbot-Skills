# Template — `quiz`

```html
<form id="bap-w-quiz" style="background:{{BG}};color:{{FG}};border-radius:14px;padding:22px;font-family:{{FONT}}">
  <h3 style="margin:0 0 14px;font-size:15px">{{QUIZ_TITLE}}</h3>
  <!-- repeat 3–5 questions -->
  <fieldset style="border:1px solid {{BORDER}};border-radius:8px;padding:12px;margin:0 0 10px">
    <legend style="padding:0 6px;font-size:12px;color:{{MUTED}}">{{QUESTION_TEXT}}</legend>
    <!-- repeat per option; mark correct option with data-correct -->
    <label style="display:block;padding:4px 0"><input type="radio" name="{{Q_NAME}}" value="{{ANSWER_VALUE}}" data-correct> {{CORRECT_TEXT}}</label>
    <label style="display:block;padding:4px 0"><input type="radio" name="{{Q_NAME}}" value="{{ANSWER_VALUE_2}}"> {{DISTRACTOR_TEXT}}</label>
  </fieldset>
  <button type="submit" style="background:#EC3B4A;color:#fff;border:0;padding:10px 18px;border-radius:6px;cursor:pointer">Submit</button>
  <output data-role="out" style="display:block;margin-top:14px;font-size:28px;font-weight:700;color:#EC3B4A;min-height:34px"></output>
  <button type="button" data-role="review" data-bap-prompt="Walk me through each answer" style="display:none;margin-top:10px;background:{{CHIP_BG}};color:{{FG}};border:1px solid {{BORDER}};border-radius:999px;padding:6px 14px;font-size:12px;cursor:pointer">Review the answers</button>
</form>
<script>(function(){var f=document.getElementById("bap-w-quiz");if(!f)return;var out=f.querySelector("[data-role=out]");var review=f.querySelector("[data-role=review]");f.addEventListener("submit",function(e){e.preventDefault();var radios=f.querySelectorAll("input[type=radio]");var names={};var correct=0;for(var i=0;i<radios.length;i++){var r=radios[i];names[r.name]=true;if(r.checked&&r.hasAttribute("data-correct"))correct++;}var total=Object.keys(names).length;if(out)out.textContent="Score: "+correct+" / "+total;if(review)review.style.display="";});})();</script>
```

## Placeholders

- `{{Q_NAME}}` — unique radio group name per question (`q1`, `q2`, …)
- Mark the correct radio with `data-correct`. The script counts them at submit.
- **No `data-bap-prompt` on individual answer radios or `<label>`s** — radios are for selection only.
- **The submit button is `type="submit"` with no `data-bap-prompt`** — scoring happens in-script via the submit handler, NEVER as a chat follow-up.
- The post-submit `<button data-role="review">` is the ONLY chat-continuation click target. Pre-render `display:none`; the submit handler reveals it.
