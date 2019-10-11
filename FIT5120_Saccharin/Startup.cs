using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FIT5120_Enigma_Buri.Startup))]
namespace FIT5120_Enigma_Buri
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
