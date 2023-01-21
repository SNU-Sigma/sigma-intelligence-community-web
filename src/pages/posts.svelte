<script>
    import axios from 'axios'

    let page = 1
    let limit = 10

    //$: items=fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`).then(response => response.json())
    $: items = axios
        .get(
            `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
        )
        .then((response) => response.data)
    function nextPage() {
        page = page + 1
    }
</script>

<header>
    <div class="wrap">
        <h1 class="main-title">ajax PAGE</h1>
        <p>�񵿱� ó�� ���� �������Դϴ�.</p>
    </div>
</header>

<div class="info">
    <div class="wrap">
        <span>PAGE: {page}</span>
    </div>
</div>

<div class="main">
    {#await items}
        <p>...Loading</p>
    {:then items}
        <ul>
            {#each items as item, index}
                <li>
                    <p>[{item.id}] {item.title}</p>
                </li>
            {/each}
        </ul>
    {:catch error}
        <p>error occur</p>
    {/await}

    <a href="#null" class="btn-blue" on:click={nextPage}>Next page</a>
</div>
