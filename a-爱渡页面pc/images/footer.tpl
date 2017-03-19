
<div class="footer_box">
 <div class="footer_img">
  <div class="pagewrap">
     <dl class="footer">
         <!-- {foreach name=nav_middle_list from=$navigator_list.middle item=nav} -->
                <dd> <a href="{$nav.url}" {if $nav.opennew eq 1}target="_blank" {/if} >{$nav.name}</a></dd>
                <!-- {/foreach} --> 
                <!--footer-->            
     </dl>
     <div class="clear"></div>
     <div class="fot"><img src="images/logo1.png"><p>一切定制都是为了爱</p></div>
  </div>
  <div class="clear"></div>
 </div>
  <div class="Copyright-Information"> {$copyright} <!-- ICP 证书{if $icp_number} -->{$lang.icp_number}:<a style="color:#A1A4A6" href="http://www.miibeian.gov.cn/" target="_blank"> &nbsp;{$icp_number} &nbsp;</a><!-- 结束ICP 证书{/if} -->技术支持：旌展信息科技有限公司</div>
</div>
</body>
</html>