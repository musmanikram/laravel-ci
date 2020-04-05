<?php

if (!function_exists('testAttribute')) {

    function testAttribute(string $value): string
    {
        return App::environment(['dev']) ? ' data-cy=' . $value : '';
    }
}
