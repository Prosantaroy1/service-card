<?php

function scbIsPremium()
{
    return SCD_HAS_PRO ? sc_fs()->can_use_premium_code() : false;
}
