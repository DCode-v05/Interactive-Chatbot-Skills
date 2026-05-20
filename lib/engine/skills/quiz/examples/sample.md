# Sample widget — `quiz`

Worked example. The loader extracts the fenced HTML block as the skill's reference widget; structural rules in `lib/engine/tools/validate.ts` (contrast, click-target, tag balance, byte cap) must all pass.

```html
<form id="bap-w-quiz" style="background:#0f1116;color:#e6e6e6;border-radius:14px;padding:22px;font-family:ui-sans-serif">
  <fieldset style="border:1px solid #333;border-radius:8px;padding:12px;margin:0 0 10px">
    <legend style="padding:0 6px;font-size:12px;color:#999">Q1</legend>
    <label style="display:block;padding:4px 0"><input type="radio" name="q1" value="a" data-correct> Right answer</label>
    <label style="display:block;padding:4px 0"><input type="radio" name="q1" value="b"> Wrong answer</label>
  </fieldset>
  <button type="submit" style="background:#EC3B4A;color:#fff;border:0;padding:10px 18px;border-radius:6px;cursor:pointer">Submit</button>
  <output data-role="out" style="display:block;margin-top:14px;font-size:28px;font-weight:700;color:#EC3B4A;min-height:34px"></output>
  <button type="button" data-role="review" data-bap-prompt="Walk me through each answer" style="display:none;margin-top:10px;background:#16181f;color:#fff;border:1px solid #333;border-radius:999px;padding:6px 14px;font-size:12px;cursor:pointer">Review the answers</button>
</form>
<script>(function(){var f=document.getElementById("bap-w-quiz");if(!f)return;var out=f.querySelector("[data-role=out]");var review=f.querySelector("[data-role=review]");f.addEventListener("submit",function(e){e.preventDefault();var radios=f.querySelectorAll("input[type=radio]");var names={};var correct=0;for(var i=0;i<radios.length;i++){var r=radios[i];names[r.name]=true;if(r.checked&&r.hasAttribute("data-correct"))correct++;}var total=Object.keys(names).length;if(out)out.textContent="Score: "+correct+" / "+total;if(review)review.style.display="";});})();</script>
```
